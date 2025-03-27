'use client'
import { useState, useRef, useEffect } from "react"
import { CardTile } from "./components/ui/card"
import { Text } from "./components/ui/text"
import { Badge } from "./components/ui/badge"
import { ChatInput } from "./components/ui/chat/chat-input"
import { ChatMessage } from "./components/ui/chat/chat-message"
import { IconThumbsUp, IconThumbsDown } from "./components/icons/icon"
import { WELCOME_TEXT, QUERY_TITLE, BADGE_TEXT, SEARCHING_TEXT, COMMON_QUESTIONS } from "./lib/constants"
import ReactMarkdown from "react-markdown"
import { ReferencesModal } from "./components/ui/modal"
import { Reference, ChatMessage as ChatMessageType, RetrievedDoc } from './lib/types'

export default function Home() {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [loading, setLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const socketRef = useRef<WebSocket | null>(null)
  const [showReferencesModal, setShowReferencesModal] = useState(false)
  const [currentReferences, setCurrentReferences] = useState<Reference[]>([])
  const [connectionStatus, setConnectionStatus] = useState<'connecting'|'connected'|'disconnected'>('connecting')

  useEffect(() => {
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    let reconnectTimer: NodeJS.Timeout;
    let ws: WebSocket;

    const connectWebSocket = () => {
      if (socketRef.current) return;

      ws = new WebSocket("ws://localhost:8000/ws");
      setConnectionStatus('connecting');

      ws.onopen = () => {
        console.log("✅ WebSocket Connected");
        reconnectAttempts = 0;
        setSocket(ws);
        setConnectionStatus('connected');
        socketRef.current = ws;
      };

      ws.onmessage = (event) => {
        console.log("📥 Received:", event.data);
        try {
          const data = JSON.parse(event.data);

          // Simplified parseLinks function for the new format
          const parseLinks = (doc: RetrievedDoc): Reference[] => {
            if (!doc?.links) return [];
            
            const references: Reference[] = [];
            const { links, ...docInfo } = doc;

            if (links.download) {
              references.push({
                type: 'download',
                url: links.download,
                ...docInfo
              });
            }

            if (links.reader) {
              references.push({
                type: 'reader',
                url: links.reader,
                ...docInfo
              });
            }

            if (links.thumbnail) {
              references.push({
                type: 'thumbnail',
                url: links.thumbnail,
                ...docInfo
              });
            }

            // Add display link if available
            if (links.display) {
              references.push({
                type: 'display',
                url: links.display,
                ...docInfo
              });
            }

            return references;
          };

          setMessages(prevMessages => {
            const lastThinkingIndex = prevMessages.findLastIndex(
              msg => msg.ai === "Thinking..."
            );
            
            if (lastThinkingIndex >= 0) {
              const newMessages = [...prevMessages];
              newMessages[lastThinkingIndex] = {
                ...newMessages[lastThinkingIndex],
                ai: data.answer,
                references: data.retrieved_docs?.flatMap(parseLinks) || []
              };
              return newMessages;
            }
            
            return [
              ...prevMessages,
              {
                farmer: data.query || "",
                ai: data.answer,
                references: data.retrieved_docs?.flatMap(parseLinks) || []
              }
            ];
          });

          setLoading(false);
        } catch (error) {
          console.error("Error parsing message:", error);
          setLoading(false);
        }
      };

      ws.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
        setConnectionStatus('disconnected');
        setLoading(false);
        ws.close();
      };

      ws.onclose = (event) => {
        console.warn("⚠️ WebSocket Closed", event.code, event.reason);
        setSocket(null);
        socketRef.current = null;
        setConnectionStatus('disconnected');
        setLoading(false);

        if (reconnectAttempts < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
          reconnectTimer = setTimeout(() => {
            reconnectAttempts++;
            connectWebSocket();
          }, delay);
        }
      };
    };

    connectWebSocket();

    return () => {
      clearTimeout(reconnectTimer);
      if (ws?.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  async function handleQuery(question: string) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket not connected.")
      return
    }

    setLoading(true)
    setShowWelcome(false)

    setMessages(prevMessages => [
      ...prevMessages,
      { farmer: question, ai: "Thinking...", references: [] },
    ])

    socket.send(JSON.stringify({ query: question }))
  }

  function ChatInputSection() {
    if (loading) {
      return (
        <div className="relative flex items-center w-1/2">
          <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-green-400"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
          <Text variant="default" className="text-center text-green-500 leading-6 tracking-widest mx-2 my-3 animate-pulse">
            {SEARCHING_TEXT}
          </Text>
          <span className="ml-2 text-xs text-gray-500">
            {connectionStatus === 'connecting' && 'Connecting...'}
            {connectionStatus === 'connected' && 'Connected'}
            {connectionStatus === 'disconnected' && 'Trying to reconnect...'}
          </span>
        </div>
      )
    }

    return <ChatInput onSendMessage={handleQuery} className="" />
  }

  function renderCommonQuestions() {
    return COMMON_QUESTIONS.map((common_que, index) => (
      <CardTile variant="query" key={index} onClick={() => handleQuery(common_que.question)}>
        <Badge className="flex">{BADGE_TEXT}</Badge>
        <Text variant="small" className="text-black">{common_que.question}</Text>
      </CardTile>
    ))
  }

  function renderChatMessages() {
    return messages.map((msg, index) => {
      const hasReferences = msg.references && msg.references.length > 0;
      
      return (
        <div key={index} className="flex flex-col">
          <div className="flex justify-end">
            <ChatMessage variant="farmer" size="sm">
              <div>{msg.farmer}</div>
            </ChatMessage>
          </div>
          <div className="flex justify-start">
            <ChatMessage className="text-black">
              <ReactMarkdown>{msg.ai}</ReactMarkdown>
              
              {hasReferences && (
                <div className="mt-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentReferences(msg.references || []);
                      setShowReferencesModal(true);
                    }}
                    className="text-sm text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md"
                  >
                    View Sources ({msg.references!.length})
                  </button>
                </div>
              )}

              <div className="flex pt-3">
                <button className="relative border border-gray-300 group cursor-pointer bg-gray-50 text-white rounded-full hover:bg-gray-300 transition w-fit scale-75 p-2 overflow-visible">
                  <IconThumbsUp className="w-2 h-2"/>
                  <div className="absolute -bottom-12 w-fit bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200">
                    Good response
                  </div>
                </button>

                <button className="relative border border-gray-300 group cursor-pointer bg-gray-50 text-white rounded-full hover:bg-gray-300 transition w-fit scale-75 p-2 overflow-visible">
                  <IconThumbsDown className="w-2 h-2" />
                  <div className="absolute -bottom-12 w-fit bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200">
                    Bad response
                  </div>
                </button>
              </div>
            </ChatMessage>
          </div>
        </div>
      )
    })
  }

  return (
    <main className=""> 
      {/* Welcome Text */}
      {showWelcome && (
        <div>
          <Text variant="subtitle" className="text-2xl text-black text-center">
            {WELCOME_TEXT}
          </Text>
        </div>
      )}

      {/* Common Questions */}
      {showWelcome && (
        <div className="flex my-16 md:my-10 justify-center">
          {renderCommonQuestions()}
        </div>
      )}

      {/* Chat History */}
      {!showWelcome && (
        <div className="px-4 md:px-7 md:mx-40 lg:mx-80 h-[70vh] overflow-y-auto scrollbar-hide">
          {renderChatMessages()}
        </div>
      )}

      {/* Query Title */}
      {showWelcome && (
        <div className="flex justify-center my-8">
          <Text variant="title" className="text-black text-center tracking-wide">
            {QUERY_TITLE}
          </Text>
        </div>
      )}

      {/* Chat Input */}
      <div className="mx-auto w-1/2 fixed bottom-0 right-0 left-0 my-10 flex justify-start">
        <ChatInputSection />
      </div>

      {/* References Modal */}
      {showReferencesModal && (
        <ReferencesModal 
          references={currentReferences} 
          onClose={() => setShowReferencesModal(false)} 
        />
      )}
    </main>
  )
}