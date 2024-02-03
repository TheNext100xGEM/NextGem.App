import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react"
import { CurrentChat } from "@models/Chat"

interface ChatContextProps {
  chatId: string | undefined
  setChatId: React.Dispatch<React.SetStateAction<string | undefined>>
  wssUrl: string
  setWssUrl: React.Dispatch<React.SetStateAction<string>>
  currentResponse: string
  setCurrentResponse: React.Dispatch<React.SetStateAction<string>>
  responseInProgress: boolean
  setResponseInProgress: React.Dispatch<React.SetStateAction<boolean>>
  currentChat: CurrentChat
  setCurrentChat: React.Dispatch<React.SetStateAction<CurrentChat>>
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [chatId, setChatId] = useState<ChatContextProps["chatId"]>(undefined)
  const [wssUrl, setWssUrl] = useState<ChatContextProps["wssUrl"]>("")
  const [currentResponse, setCurrentResponse] =
    useState<ChatContextProps["currentResponse"]>("")
  const [responseInProgress, setResponseInProgress] =
    useState<ChatContextProps["responseInProgress"]>(false)
  const [currentChat, setCurrentChat] = useState<
    ChatContextProps["currentChat"]
  >({
    title: "",
    messages: []
  })

  useEffect(() => {
    if (wssUrl === "") {
      return
    }

    const ws = new WebSocket(wssUrl)
    ws.onmessage = (evt) => {
      const json = JSON.parse(evt.data)
      if (json.type === "chat_stream_packet" && json.body.content) {
        handleNewMessagePart(json.body.content)
      }
    }

    const handleNewMessagePart = (message: string) => {
      setResponseInProgress(true)

      if (!currentChat.messages.length) {
        setCurrentChat({
          ...currentChat,
          messages: [
            {
              role: "ai",
              content: message,
              date: new Date().toString()
            }
          ]
        })
      } else {
        const messages = currentChat.messages.map((m, i) => {
          if (i === currentChat.messages.length - 1) {
            m.content = message
          }
          return m
        })

        setCurrentChat({
          ...currentChat,
          messages
        })
      }

      setCurrentResponse((prevResponse) => prevResponse + message)
    }
  }, [wssUrl, currentChat])

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
        setCurrentChat
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
