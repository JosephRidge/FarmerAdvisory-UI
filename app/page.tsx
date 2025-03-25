'use client'
import { useState, useRef } from "react"
import { CardTile } from "./components/ui/card"
import { Text } from "./components/ui/text"
import { Badge } from "./components/ui/badge"
import { ChatInput } from "./components/ui/chat/chat-input"
import { ChatMessage } from "./components/ui/chat/chat-message"
import { IconThumbsUp, IconThumbsDown } from "./components/icons/icon"
import { WELCOME_TEXT, QUERY_TITLE, BADGE_TEXT, SEARCHING_TEXT, COMMON_QUESTIONS } from "./lib/constants"
import { env } from "node:process"

export default function Home() {
  // const messages = [{farmer:"Hello Junior", ai:"How can I help you?"}] 
  const [messages, setMessages] = useState<{ farmer: string, ai: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null)



  async function handleQuery(question: string) {
    setLoading(true)
    setShowWelcome(false)

    // Optimistically update the chat with the farmer's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { farmer: question, ai: "Thinking..." }, // Placeholder response
    ])

    try {
      const response = await fetch(`${process.env.BASE_URL}/ws`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      })

      if (!response.ok) throw new Error("Failed to fetch response")

      const data = await response.json()

      // Replace placeholder with real AI response
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.farmer === question ? { ...msg, ai: data.answer } : msg
        )
      )
    } catch (error) {
      console.error("Error fetching response:", error)

      // Show error message in chat
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.farmer === question ? { ...msg, ai: "Sorry, something went wrong. Try again!" } : msg
        )
      )
    } finally {
      setLoading(false)
    }
  }

  function ChatInputSection() {
    if (loading) {
      return (
        <div className="relative flex size-6">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex size-6 rounded-full bg-green-500"></span>
          <Text variant={"default"} className="text-center text-green-500 leading-6 tracking-widest mx-2 my-3 animate-pulse">
            {SEARCHING_TEXT}
          </Text>
        </div>
      )
    }

    return <ChatInput onSendMessage={handleQuery} />
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
      <div key={index} className="flex flex-col ">
        <div className="flex justify-end">
          <ChatMessage variant={"farmer"} className="bg-green-200 text-black  max-w-xs">
            <div>{msg.farmer}</div>
          </ChatMessage>
        </div>
        <div className="flex justify-start">
          <ChatMessage className="bg-gray-50 text-black p-2 max-w-xs">
            <div>{msg.ai}</div>

            <div className="flex pt-3">
            <button className="relative border border-gray-300 group cursor-pointer bg-gray-50 text-white rounded-full hover:bg-gray-300 transition w-fit  scale-75 p-2 overflow-visible">
              <IconThumbsUp className="w-2  h-2" />
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
    <main className="overflow-hi dden">
      {/* Welcome Text */}
      {showWelcome && <div className="w-full justify-end"><Text variant={"subtitle"} className="text-2xl text-black text-center ">{WELCOME_TEXT}</Text></div>}

      {/* Common Questions */}
      {showWelcome && <div className="flex my-16 md:my-10 justify-center">{renderCommonQuestions()}</div>}

      {/* Chat History */}
      {!showWelcome && <div className="px-48 h-[28em] mx-10 overflow-y-scroll smooth">{renderChatMessages()}</div>}

      {/* Query Title */}
      {showWelcome && <div className="flex justify-center my-8">
        <Text variant={"title"} className="text-black text-center tracking-wide">{QUERY_TITLE}</Text>
      </div>}

      {/* Chat Input */}
      <div className="w-1/2 mx-auto fixed bottom-0 right-0 left-0 my-10 flex justify-start">
        <ChatInputSection />
      </div>


    </main>
  )
}
