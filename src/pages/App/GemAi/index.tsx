import "./_gemAi.scss"
import logo from "@assets/img/logo-next-gem.webp"
import { Alert, Button, Corner, Grid, Loader, Menu } from "@components/ui"
import {
  CHAT_NAME,
  SITE_NAME,
  SOUND_BUTTON_CLICK,
  SOUND_BUTTON_HOVER,
  SOUND_SEND_MESSAGE,
  TOKEN_NAME,
  VOLUME_BUTTON_CLICK,
  VOLUME_BUTTON_HOVER
} from "@constants/index"
import { useAppContext } from "@context/AppContext"
import { useChatContext } from "@context/ChatContext"
import { Behavior } from "@enums/Behavior"
import { Icon } from "@iconify/react"
import {
  ApiUserChats,
  ChatMessage,
  UserChat,
  mapChatMessage,
  mapUserChat
} from "@models/Chat"
import { useMutation, useQuery } from "@tanstack/react-query"
import { filterUsersByDate, formatReadableDate } from "@utils/date"
import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import TextareaAutosize from "react-textarea-autosize"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"

import {
  deleteUserChat,
  getUserChatId,
  getUserChats,
  postChatMessage
} from "../../../queries/api"
import Markdown from "@components/ui/Markdown"
import ChatEmbed from "@components/ui/ChatEmbed"

const LogoImg = () => <img src={logo} alt={SITE_NAME} draggable='false' />

const ScrollToBottom = (behavior: Behavior = "smooth") => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: behavior
  })
}

function GemAiPage() {
  const message = useRef<HTMLTextAreaElement>(null)
  const { web3Token, isPremium, setIsPremium } = useAppContext()
  const {
    chatId,
    setChatId,
    setWssUrl,
    currentChat,
    setCurrentChat,
    responseInProgress,
    setResponseInProgress
  } = useChatContext()

  const [asideResponsive, setAsideResponsive] = useState(false)
  const [newConversation, setNewConversation] = useState(true)
  const [conversationInProgress, setConversationInProgress] = useState(true)
  const [conversationActive, setConversationActive] = useState<{
    id: string
    name: string
  } | null>(null)
  const [usersToday, setUsersToday] = useState<UserChat[]>([])
  const [usersLast7Days, setUsersLast7Days] = useState<UserChat[]>([])
  const [usersLast30Days, setUsersLast30Days] = useState<UserChat[]>([])

  const [soundClick] = useSound(SOUND_BUTTON_CLICK, {
    volume: VOLUME_BUTTON_CLICK
  })
  const [soundHover] = useSound(SOUND_BUTTON_HOVER, {
    volume: VOLUME_BUTTON_HOVER
  })

  useEffect(() => ScrollToBottom("instant"), [])
  useEffect(() => ScrollToBottom("instant"), [currentChat.messages])

  const qPostChatMessage = useMutation({
    mutationFn: postChatMessage
  })

  const qDeleteUserChat = useMutation({
    mutationFn: deleteUserChat
  })

  useEffect(() => {
    if (qPostChatMessage.data) {
      setWssUrl(qPostChatMessage.data.wssUrl)
      if (qPostChatMessage.data.chatId) {
        setConversationActive({
          name: qPostChatMessage.data.assignedName,
          id: qPostChatMessage.data.chatId
        })
        setNewConversation(false)
      }
    }
  }, [qPostChatMessage.data, setWssUrl])

  useEffect(() => {
    if (conversationActive) {
      setChatId(conversationActive.id)
    }
  }, [conversationActive, setChatId])

  const handlePostMessage = async () => {
    if (message.current) {
      const userMessage = message.current.value

      setConversationInProgress(true)
      setResponseInProgress(true)

      await qPostChatMessage.mutateAsync({ message: userMessage, chatId })
      if (!chatId) {
        qUserChats.refetch()
      }
      setCurrentChat({
        ...currentChat,
        messages: [
          ...currentChat.messages,
          {
            role: "user",
            date: new Date().toString(),
            content: userMessage,
            embeds: []
          },
          {
            role: "assistant",
            date: new Date().toString(),
            content: "",
            embeds: []
          }
        ]
      })
    }
  }

  const qUserChats = useQuery({
    queryKey: ["userChats", web3Token],
    queryFn: getUserChats,
    select: (data) => {
      if ('chats' in data) {
        return (data as ApiUserChats).data.map(mapUserChat);
      } else {
        setIsPremium(false)
      }
    },
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!qUserChats.data) return

    const today = filterUsersByDate(qUserChats.data, 1)
    setUsersToday(today)

    const last7Days = filterUsersByDate(qUserChats.data, 7).filter(
      (user) => !today.includes(user)
    )
    setUsersLast7Days(last7Days)

    const last30Days = filterUsersByDate(qUserChats.data, 30).filter(
      (user) => !today.includes(user) && !last7Days.includes(user)
    )
    setUsersLast30Days(last30Days)
  }, [qUserChats.data])

  const qUserChatId = useQuery({
    queryKey: ["chatMessage", conversationActive],
    queryFn: () => getUserChatId({ id: conversationActive!.id }),
    select: (data) => data.map(mapChatMessage),
    refetchOnWindowFocus: false,
    enabled: !!conversationActive && !conversationInProgress
  })

  useEffect(() => {
    if (qUserChatId.data) {
      setCurrentChat({
        title: conversationActive?.name ?? "Unnamed chat",
        messages: qUserChatId.data
      })
    }
  }, [qUserChatId.data])

  const FormAi = () => {
    const min = 1
    const max = 7
    const placeholder = `Message to ${CHAT_NAME}…`

    const ButtonSend = (
      <Button
        icon='carbon:send'
        minus
        color='tertiary'
        pathSoundClick={SOUND_SEND_MESSAGE}
        onClick={handlePostMessage}
      />
    )
    const ButtonLocked = (
      <Button
        icon='carbon:locked'
        minus
        color='tertiary'
        status='warning'
        className='locked'
      />
    )

    const handleKeyPress = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (evt.key === "Enter" && !evt.shiftKey) {
        handlePostMessage()
      }
    }

    const disabled = !isPremium || responseInProgress

    return (
      <div className='ai-chat-form'>
        <div className='ai-chat-form-text'>
          <TextareaAutosize
            minRows={min}
            maxRows={max}
            placeholder={placeholder}
            spellCheck='false'
            disabled={disabled}
            ref={message}
            onKeyDown={handleKeyPress}
          />
          <div className='btn-right'>
            {disabled ? ButtonLocked : ButtonSend}
          </div>
          <Corner color='primary' />
        </div>
        <p>
          {CHAT_NAME} can make errors. Remember to check important information.
        </p>
      </div>
    )
  }

  const List = () => {
    const Item = ({ id, name }: UserChat) => {
      const handleDelete = async () => {
        await qDeleteUserChat.mutateAsync({ chatId: id })
        qUserChats.refetch()
      }
      const actions = [
        // <Button icon='carbon:pen' color='tertiary'>
        //   Rename
        // </Button>,
        <Button
          icon='carbon:trash-can'
          color='secondary'
          status='danger'
          onClick={handleDelete}
        >
          Delete Chat
        </Button>
      ]

      return (
        <>
          <div className='ai-list-item-title'>{name}</div>
          <Menu sub={actions} />
        </>
      )
    }

    const setConversation = ({ id, name }: { id: string; name: string }) => {
      setNewConversation(false)
      setConversationInProgress(false)
      setConversationActive({
        name: name,
        id: id
      })
      soundClick()
      ScrollToBottom()
      setAsideResponsive(false)
    }

    const handleNewConversation = () => {
      setNewConversation(true)
      setAsideResponsive(false)
      setConversationActive(null)
      setCurrentChat({
        title: "Unnamed chat",
        messages: []
      })
      setChatId(undefined)
    }

    return (
      <aside className={classNames("ai-list", { opened: asideResponsive })}>
        <ul>
          <li className='ai-list-heading'>
            <span>Last conversations</span>
            <Button
              icon='carbon:add-comment'
              minus
              status='success'
              title='New conversation'
              onClick={handleNewConversation}
            />
          </li>

          {usersLast30Days.length > 0 && (
            <>
              {usersLast30Days.map((conversation, id) => (
                <li
                  key={id}
                  className={classNames("ai-list-item", {
                    active:
                      conversationActive &&
                      conversationActive.id === conversation.id
                  })}
                >
                  <Item {...conversation} />
                  <div
                    className='ai-list-item-clicker'
                    onClick={() => setConversation(conversation)}
                    onMouseEnter={() => soundHover()}
                  />
                  <Corner
                    color={
                      conversationActive &&
                      conversationActive.id === conversation.id
                        ? "primary"
                        : "tertiary"
                    }
                  />
                </li>
              ))}
              <li className='ai-list-subheading'>Last 30 days</li>
            </>
          )}
          {usersLast7Days.length > 0 && (
            <>
              {usersLast7Days.map((conversation, id) => (
                <li
                  key={id}
                  className={classNames("ai-list-item", {
                    active:
                      conversationActive &&
                      conversationActive.id === conversation.id
                  })}
                >
                  <Item {...conversation} />
                  <div
                    className='ai-list-item-clicker'
                    onClick={() => setConversation(conversation)}
                    onMouseEnter={() => soundHover()}
                  />
                  <Corner
                    color={
                      conversationActive &&
                      conversationActive.id === conversation.id
                        ? "primary"
                        : "tertiary"
                    }
                  />
                </li>
              ))}
              <li className='ai-list-subheading'>Last 7 days</li>
            </>
          )}
          {usersToday.length > 0 && (
            <>
              {usersToday.map((conversation, id) => (
                <li
                  key={id}
                  className={classNames("ai-list-item", {
                    active:
                      conversationActive &&
                      conversationActive.id === conversation.id
                  })}
                >
                  <Item {...conversation} />
                  <div
                    className='ai-list-item-clicker'
                    onClick={() => setConversation(conversation)}
                    onMouseEnter={() => soundHover()}
                  />
                  <Corner
                    color={
                      conversationActive &&
                      conversationActive.id === conversation.id
                        ? "primary"
                        : "tertiary"
                    }
                  />
                </li>
              ))}
              <li className='ai-list-subheading'>Today</li>
            </>
          )}
          {!qUserChats.data && !qUserChats.isFetched && (
            <li className='ai-list-loader'>
              <Loader />
            </li>
          )}
        </ul>
      </aside>
    )
  }

  const Message = ({ role, content, date, embeds, contextResponse }: ChatMessage) => {
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
        {embeds && (
          <>
                    <Grid className='embeds'>
            {embeds.map((embed, i) => (
              <ChatEmbed embed={embed} key={i} />
            ))}
          </Grid>
          {contextResponse && (<p>{contextResponse}</p>)}
          </>
        )}
      </li>
    )
  }

  const Conversation = () => {
    const NewConversation = () => {
      return (
        <div className='start'>
          <LogoImg />
          <h4>Welcome to {CHAT_NAME}</h4>
          <div className='intro'>
            <p>
              The Nextgem LLM is comprised of knowledge garnered through the
              analysis of multiple LLM models such as GPT, Grok, Mistral and
              Gemini AI.
              <br />
              Ask any question related to any project(s) below.
            </p>
          </div>
          {!isPremium && (
            <>
              <Alert status='warning'>
                You don't have access to <strong>{CHAT_NAME}</strong>, go burn{" "}
                <strong>{TOKEN_NAME}</strong> to unlock access.
              </Alert>
              <Button
                href='/staking'
                icon='carbon:shopping-cart'
                status='success'
              >
                Buy access now
              </Button>
            </>
          )}
        </div>
      )
    }

    return (
      <ul className='ai-chat-content'>
        {!newConversation &&
          !qUserChatId.isFetching &&
          currentChat.messages.length !== 0 &&
          currentChat.messages.map((message, id) => (
            <Message key={id} {...message} />
          ))}
        {newConversation && <NewConversation />}
        {qUserChatId.isFetching && <Loader big={true} />}
      </ul>
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
        <Button
          icon={asideResponsive ? "carbon:close-large" : "carbon:list"}
          minus
          className={classNames("ai-list-opener", { opened: asideResponsive })}
          onClick={() => setAsideResponsive(!asideResponsive)}
        />
        <div className='ai-module'>
          <div className='wrapper'>
            <div className='ai-chat'>
              <Conversation />
              <FormAi />
            </div>
          </div>
        </div>
        <div className='ai-bg'></div>
      </div>
    </>
  )
}

export default GemAiPage
