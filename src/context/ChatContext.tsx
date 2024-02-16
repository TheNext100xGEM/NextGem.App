import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react"
import { CurrentChat } from "@models/Chat"
import { ApiEmbed, mapEmbed } from "@models/ChatEmbed"
import { useNavigate } from "react-router-dom"

interface ChatContextProps {
  chatId: string | undefined
  setChatId: React.Dispatch<React.SetStateAction<string | undefined>>
  wssUrl: string | undefined
  setWssUrl: React.Dispatch<React.SetStateAction<string | undefined>>
  currentResponse: string | undefined
  setCurrentResponse: React.Dispatch<React.SetStateAction<string | undefined>>
  responseInProgress: boolean
  setResponseInProgress: React.Dispatch<React.SetStateAction<boolean>>
  currentChat: CurrentChat
  setCurrentChat: React.Dispatch<React.SetStateAction<CurrentChat>>
  reset: () => void
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const [ws, setWs] = useState<WebSocket | null>(null)
  const [chatId, setChatId] = useState<ChatContextProps["chatId"]>(undefined)
  const [wssUrl, setWssUrl] = useState<ChatContextProps["wssUrl"]>(undefined)
  const [currentResponse, setCurrentResponse] =
    useState<ChatContextProps["currentResponse"]>(undefined)
  const [responseInProgress, setResponseInProgress] =
    useState<ChatContextProps["responseInProgress"]>(false)
  const [currentChat, setCurrentChat] = useState<
    ChatContextProps["currentChat"]
  >({
    messages: []
  })

  const reset = () => {
    setChatId(undefined)
    setWssUrl(undefined)
    setCurrentResponse(undefined)
    setResponseInProgress(false)
    setCurrentChat({ messages: [] })

    if (ws) {
      ws.close()
    }
  }

  useEffect(() => {
    if (!wssUrl) {
      return
    }

    let timeout: NodeJS.Timeout

    const newWs = new WebSocket(wssUrl)
    setWs(newWs)

    newWs.onmessage = (evt) => {
      setResponseInProgress(true)

      const json = JSON.parse(evt.data)

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        handleEnd(json.body.embeds, json.body.contextResponse)
        newWs.close()
      }, 60000)

      if (json.type === "chat_stream_packet" && json.body.content) {
        handleNewMessagePart(json.body.content, json.body.contextResponse)
      }

      if (json.type === "chat_stream_end") {
        handleEnd(json.body.embeds, json.body.contextResponse)
        clearTimeout(timeout)
        newWs.close()
      }
    }

    const handleNewMessagePart = (
      content: string,
      contextResponse?: string
    ) => {
      if (!currentChat.messages.length) {
        setCurrentChat({
          ...currentChat,
          messages: [
            {
              role: "ai",
              content: content,
              date: new Date().toString(),
              embeds: [],
              contextResponse: contextResponse
            }
          ]
        })
      } else {
        const messages = currentChat.messages.map((m, i) => {
          if (i === currentChat.messages.length - 1) {
            m.content = content
            m.contextResponse = contextResponse
          }
          return m
        })

        setCurrentChat({
          ...currentChat,
          messages
        })
      }

      setCurrentResponse((prevResponse) => prevResponse + content)

      return () => {
        if (newWs) {
          newWs.close()
        }
        clearTimeout(timeout)
      }
    }
  }, [wssUrl])

  const handleEnd = (embeds: ApiEmbed[], contextResponse?: string) => {
    handleEmbeds(embeds, contextResponse)
    setResponseInProgress(false)
    navigate(`/gem-ai/${chatId}`)
  }

  const handleEmbeds = (embeds: ApiEmbed[], contextResponse?: string) => {
    const messages = currentChat.messages.map((m, i) => {
      if (i === currentChat.messages.length - 1) {
        m.embeds = embeds.map(mapEmbed)
        m.contextResponse = contextResponse
      }
      return m
    })

    setCurrentChat({
      ...currentChat,
      messages
    })
  }

  return (
    <ChatContext.Provider
      value={{
        chatId,
        setChatId,
        wssUrl,
        setWssUrl,
        currentResponse,
        setCurrentResponse,
        responseInProgress,
        setResponseInProgress,
        currentChat,
        setCurrentChat,
        reset
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useChatContext = () => {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error("useChatContext must be used within an ChatContextProvider")
  }

  return context
}
