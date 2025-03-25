'use client'
import { useState, useRef } from "react"
import { CardTile } from "./components/ui/card"
import { Text } from "./components/ui/text"
import { Badge } from "./components/ui/badge"
import { ChatInput } from "./components/ui/chat/chat-input"
import { ChatMessage } from "./components/ui/chat/chat-message"
import { IconThumbsUp } from "./components/icons/icon"
import { WELCOME_TEXT, QUERY_TITLE, BADGE_TEXT, SEARCHING_TEXT, COMMON_QUESTIONS } from "./lib/constants"

export default function Home() {
  // const messages = [{farmer:"Hello Junior", ai:"How can I help you?"}] 
  const [messages, setMessages] = useState<{ farmer: string, ai: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);



  async function handleQuery(question: string) {
    setLoading(true)
    setShowWelcome(false)

    // Optimistically update the chat with the farmer's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { farmer: question, ai: "Thinking..." }, // Placeholder response
    ])

    try {
      const response = await fetch("https://your-api-endpoint.com/chat", {
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
          <ChatMessage className="bg-gray-900 text-light p-2 max-w-xs">
            <div>{msg.ai}</div>
            
            <button
            onClick={()=>{}}
            className="cursor-pointer  bg-gray-50 text-white rounded-full hover:bg-gray-800 transition p-2"
          >
            <IconThumbsUp className="w-6 h-6"/>
          </button>
          </ChatMessage>
        </div>
      </div>
    ))
  }

  return (
    <main className="overflow-hidden">
      {/* {showWelcome && <div>Element to show or hide</div>} */}
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
