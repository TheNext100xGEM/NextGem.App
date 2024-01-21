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

interface ChatContextProps {
  chatId: string
  setChatId: React.Dispatch<React.SetStateAction<string>>
  streamId: string
  setStreamId: React.Dispatch<React.SetStateAction<string>>
  currentResponse: string
  setCurrentResponse: React.Dispatch<React.SetStateAction<string>>
  responseInProgress: boolean
  setResponseInProgress: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [chatId, setChatId] = useState<ChatContextProps["chatId"]>("")
  const [streamId, setStreamId] = useState<ChatContextProps["streamId"]>("")
  const [currentResponse, setCurrentResponse] =
    useState<ChatContextProps["currentResponse"]>("")
  const [responseInProgress, setResponseInProgress] =
    useState<ChatContextProps["responseInProgress"]>(false)

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
        setResponseInProgress
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
