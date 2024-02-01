import { generateId } from "@utils/id"
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react"
import { io } from "socket.io-client"
import { CHAT_API_URL } from "../libs/constants"
import { CurrentChat } from "@models/Chat"

interface ChatContextProps {
  chatId: string
  setChatId: React.Dispatch<React.SetStateAction<string>>
  streamId: string
  setStreamId: React.Dispatch<React.SetStateAction<string>>
  currentResponse: string
  setCurrentResponse: React.Dispatch<React.SetStateAction<string>>
  responseInProgress: boolean
  setResponseInProgress: React.Dispatch<React.SetStateAction<boolean>>
  currentChat: CurrentChat
  setCurrentChat: React.Dispatch<React.SetStateAction<CurrentChat>>
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [chatId, setChatId] = useState<ChatContextProps["chatId"]>("")
  const [streamId, setStreamId] = useState<ChatContextProps["streamId"]>("")
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

  const socket = io(CHAT_API_URL, {
    autoConnect: false
  })

  useEffect(() => {
    setChatId(generateId())
  }, [])

  useEffect(() => {
    if (streamId === "") {
      return
    }
    socket.connect()

    socket.emit(`listen_${streamId}`)

    const handleNewMessagePart = (messagePart: string) => {
      setResponseInProgress(true)

      if (!currentChat.messages.length) {
        setCurrentChat({
          ...currentChat,
          messages: [
            {
              role: "ai",
              content: messagePart,
              date: new Date().toString()
            }
          ]
        })
      } else {
        const messages = currentChat.messages.map((m, i) => {
          if (i === currentChat.messages.length - 1) {
            m.content += messagePart
          }
          return m
        })

        setCurrentChat({
          ...currentChat,
          messages
        })
      }

      setCurrentResponse((prevResponse) => prevResponse + messagePart)
    }

    socket.on(`chat_stream_packet_${streamId}`, handleNewMessagePart)

    socket.once(`chat_stream_end_${streamId}`, () => {
      setResponseInProgress(false)
      socket.off(`chat_stream_packet_${streamId}`, handleNewMessagePart)
    })
  }, [streamId])

  return (
    <ChatContext.Provider
      value={{
        chatId,
        setChatId,
        streamId,
        setStreamId,
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
