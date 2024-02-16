import "../GemAi/_gemAi.scss"
import { Button, Loader } from "@components/ui"
import { CHAT_NAME, SITE_NAME } from "@constants/index"
import { useChatContext } from "@context/ChatContext"
import { Behavior } from "@enums/Behavior"
import { mapChatMessage } from "@models/Chat"
import { useMutation, useQuery } from "@tanstack/react-query"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { getUserChatId, postChatMessage } from "../../../queries/api"
import List from "@components/GemAi/List"
import Form from "@components/GemAi/Form"
import { useParams } from "react-router-dom"
import Message from "@components/GemAi/Message"

const ScrollToBottom = (behavior: Behavior = "smooth") => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: behavior
  })
}

function GemAiSinglePage() {
  const { chatId } = useParams()

  const [asideResponsive, setAsideResponsive] = useState(false)

  const {
    setChatId,
    setWssUrl,
    currentChat,
    setCurrentChat,
    reset
  } = useChatContext()

  const [conversationActive, setConversationActive] = useState<{
    id: string
    name: string
  } | null>(null)

  useEffect(() => {
    reset()
  }, [chatId])

  useEffect(() => {
    if (currentChat.messages.length > 0) {
      ScrollToBottom("instant")
    }
  }, [currentChat.messages])

  const qPostChatMessage = useMutation({
    mutationFn: postChatMessage
  })

  useEffect(() => {
    if (qPostChatMessage.data) {
      setWssUrl(qPostChatMessage.data.wssUrl)
      if (qPostChatMessage.data.chatId) {
        setConversationActive({
          name: qPostChatMessage.data.assignedName,
          id: qPostChatMessage.data.chatId
        })
      }
    }
  }, [qPostChatMessage.data])

  useEffect(() => {
    if (conversationActive) {
      setChatId(conversationActive.id)
    }
  }, [conversationActive])

  const qUserChatId = useQuery({
    queryKey: ["chatMessage", chatId],
    queryFn: () => getUserChatId({ id: chatId! }),
    select: (data) => data.map(mapChatMessage),
    refetchOnWindowFocus: false,
    enabled: !!chatId
  })

  useEffect(() => {
    if (qUserChatId.data) {
      setCurrentChat({
        messages: qUserChatId.data
      })
    }
  }, [qUserChatId.data])

  return (
    <>
      <Helmet>
        <title>
          {SITE_NAME} — {CHAT_NAME}
        </title>
      </Helmet>
      <div className='ai'>
        <List opened={asideResponsive} />
        <Button
          icon={asideResponsive ? "carbon:close-large" : "carbon:list"}
          minus
          className={classNames("ai-list-opener", { opened: asideResponsive })}
          onClick={() => setAsideResponsive(!asideResponsive)}
        />
        <div className='ai-module'>
          <div className='wrapper'>
            <div className='ai-chat'>
              <ul className='ai-chat-content'>
                {!qUserChatId.isFetching &&
                  currentChat.messages.length !== 0 &&
                  currentChat.messages.map((message, id) => (
                    <Message
                      key={id}
                      {...message}
                      last={id === currentChat.messages.length - 1}
                    />
                  ))}
                {qUserChatId.isFetching && <Loader big={true} />}
              </ul>
              <Form />
            </div>
          </div>
        </div>
        <div className='ai-bg'></div>
      </div>
    </>
  )
}

export default GemAiSinglePage
