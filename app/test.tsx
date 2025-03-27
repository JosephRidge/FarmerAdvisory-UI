'use client'
import { useState, useRef, useEffect } from "react"
import { CardTile } from "./components/ui/card"
import { Text } from "./components/ui/text"
import { Badge } from "./components/ui/badge"
import { ChatInput } from "./components/ui/chat/chat-input"
import { ChatMessage } from "./components/ui/chat/chat-message"
import { IconThumbsUp, IconThumbsDown } from "./components/icons/icon"
import { WELCOME_TEXT, QUERY_TITLE, BADGE_TEXT, SEARCHING_TEXT, COMMON_QUESTIONS } from "./lib/constants"
import { env } from "node:process"
import ReactMarkdown from "react-markdown";

export default function Home() {
  // const messages = [{farmer:"Hello Junior", ai:"How can I help you?"}] 
  const [messages, setMessages] = useState<{ farmer: string, ai: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true) 
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [selectedReference, setSelectedReference] = useState<any | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      const ws = new WebSocket("ws://localhost:8000/ws");
  
      ws.onopen = () => {
        console.log("✅ WebSocket Connected");
        setSocket(ws);  // <-- Update state when connected
      };
  
      ws.onmessage = (event) => {
        console.log("📥 Received:", event.data);
        const data = JSON.parse(event.data);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.farmer === data.query ? { ...msg, ai: data.answer, references: data.retrieved_docs || [] } : msg
          )
        );
        setLoading(false)
      };
  
      ws.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
      };
  
      ws.onclose = () => {
        console.warn("⚠️ WebSocket Closed");
        setSocket(null);  // Reset socket state
        socketRef.current = null;
      };
  
      socketRef.current = ws; // Assign WebSocket instance
    }
  
    return () => {
      socketRef.current?.close();
    };
  }, []);
  
  
  async function handleQuery(question: string) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket not connected.");
      return;
    }

    setLoading(true);
    setShowWelcome(false);

    // Optimistically update the chat with farmer's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { farmer: question, ai: "Thinking..." }, // Placeholder response
    ]);

    // Send the query through WebSocket
    socket.send(JSON.stringify({ query: question }));
  } 

  function ChatInputSection() {
    if (loading) {
      return (
        <div className="relative flex   w-1/2">
          <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-green-400  "></span>
          <span className="relative inline-flex h-4 w-4   rounded-full bg-green-500"></span>
          <Text variant={"default"} className="text-center text-green-500 leading-6 tracking-widest mx-2 my-3 animate-pulse">
            {SEARCHING_TEXT}
          </Text>
        </div>
      )
    }

    return <ChatInput onSendMessage={handleQuery} className=""/>
  }

  function renderCommonQuestions() {
    return COMMON_QUESTIONS.map((common_que, index) => (
      <CardTile variant={"query"} key={index} onClick={() => handleQuery(common_que.question)}>
        <Badge className="flex">{BADGE_TEXT}</Badge>
        <Text variant={"small"} className="text-black">{common_que.question}</Text>
      </CardTile>
    ))
  }

  function renderChatMessages() {
    return messages.map((msg, index) => (
      <div key={index} className="flex flex-col">
        <div className="flex justify-end">
          <ChatMessage variant={"farmer"}size={"sm"}  >
            <div>{msg.farmer}</div>
          </ChatMessage>
        </div>
        <div className="flex justify-start">
          <ChatMessage className="text-black " >
            <div>  <ReactMarkdown>{msg.ai}</ReactMarkdown></div>

            <div className="flex pt-3">
            <button className="relative border border-gray-300 group cursor-pointer bg-gray-50 text-white rounded-full hover:bg-gray-300 transition w-fit  scale-75 p-2 overflow-visible">
              <IconThumbsUp className="w-2 h-2"/>
              <div className="absolute -bottom-12  w-fit  bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200">
                Good response
              </div>
            </button>

            <button className="relative border border-gray-300 group cursor-pointer bg-gray-50 text-white rounded-full hover:bg-gray-300 transition w-fit  scale-75 p-2 overflow-visible">
              <IconThumbsDown className="w-2  h-2" />
              <div className="absolute -bottom-12  w-fit  bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200">
                Bad response
              </div>
            </button>
            </div> 
          </ChatMessage>
        </div>
      </div>
    ))
  }

  return (
    <main className=""> 
      {/* Welcome Text */}
      {showWelcome && <div ><Text variant={"subtitle"} className="text-2xl text-black text-center ">{WELCOME_TEXT}</Text></div>}

      {/* Common Questions */}
      {showWelcome && <div className="flex my-16 md:my-10 justify-center">{renderCommonQuestions()}</div>}

      {/* Chat History */}
      {!showWelcome && <div className="px-4 md:px-7 md:mx-40 lg:mx-80 h-[70vh] overflow-y-auto scrollbar-hide">{renderChatMessages()}</div>}

      {/* Query Title */}
      {showWelcome && <div className="flex justify-center my-8">
        <Text variant={"title"} className="text-black text-center tracking-wide">{QUERY_TITLE}</Text>
      </div>}

      {/* Chat Input */}
      <div className=" mx-auto w-1/2 fixed bottom-0 right-0 left-0 my-10 flex justify-start">
        <ChatInputSection />
      </div>


    </main>
  )
}
