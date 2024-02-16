import "./_gemAi.scss"
import logo from "@assets/img/logo-next-gem.webp"
import { Grid, Loader } from "@components/ui"
import { CHAT_NAME, SITE_NAME } from "@constants/index"
import { useChatContext } from "@context/ChatContext"
import { Behavior } from "@enums/Behavior"
import { Icon } from "@iconify/react"
import {
  ChatMessage,
  mapChatMessage,
} from "@models/Chat"
import { useMutation, useQuery } from "@tanstack/react-query"
import { formatReadableDate } from "@utils/date"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import {
  getUserChatId,
  postChatMessage
} from "../../../queries/api"
import Markdown from "@components/ui/Markdown"
import ChatEmbed from "@components/ui/ChatEmbed"
import List from "@components/GemAi/List"
import Form from "@components/GemAi/Form"
import { useParams } from "react-router-dom"

const LogoImg = () => <img src={logo} alt={SITE_NAME} draggable='false' />

const ScrollToBottom = (behavior: Behavior = "smooth") => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: behavior
  })
}

function GemAiSinglePage() {
  const { chatId } = useParams()

  const { setChatId, setWssUrl, currentChat, setCurrentChat, reset } = useChatContext()

  const [conversationActive, setConversationActive] = useState<{
    id: string
    name: string
  } | null>(null)

useEffect(() => {
  reset()
}, [chatId])

  useEffect(() => {
    if (currentChat.messages.length > 0) {
      ScrollToBottom('instant')
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

  const Message = ({
    role,
    content,
    date,
    embeds,
    contextResponse
  }: ChatMessage) => {
    const dateFormat = formatReadableDate(date)

    // const menuItems = [
    //   <Button icon='carbon:bookmark' minus color='tertiary' title='Save' />,
    //   <Button icon='carbon:copy' minus color='tertiary' title='Copy' />,
    //   <Button icon='carbon:debug' minus color='tertiary' title='Report' />
    // ]

    return (
      <li className={classNames("message", role)}>
        <div className='avatar'>
          {role == "assistant" ? <LogoImg /> : <Icon icon='carbon:user' />}
        </div>
        <div className='top'>
          <div className='author'>
            <strong>{role === "user" ? "You" : CHAT_NAME}</strong>
            <time>{dateFormat}</time>
          </div>
          {/* <div className='right'>
            <Menu items={menuItems} />
          </div> */}
        </div>
        <div className='content'>
          {content === "" ? <Loader /> : <Markdown>{content}</Markdown>}
        </div>
        {embeds.length > 0 && (
          <>
            <Grid className='embeds'>
              {embeds.map((embed, i) => (
                <ChatEmbed embed={embed} key={i} />
              ))}
            </Grid>
            {contextResponse && <p>{contextResponse}</p>}
          </>
        )}
      </li>
    )
  }

  return (
    <>
      <Helmet>
        <title>
          {SITE_NAME} — {CHAT_NAME}
        </title>
      </Helmet>
      <div className='ai'>
        <List />
        <div className='ai-module'>
          <div className='wrapper'>
            <div className='ai-chat'>
              <ul className='ai-chat-content'>
                {!qUserChatId.isFetching &&
                  currentChat.messages.length !== 0 &&
                  currentChat.messages.map((message, id) => (
                    <Message key={id} {...message} />
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
