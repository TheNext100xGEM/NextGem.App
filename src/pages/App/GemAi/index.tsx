import "./_gemAi.scss"
import logo from "@assets/img/logo-next-gem.webp"
import { Alert, Button, Corner, Loader, Menu } from "@components/ui"
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
import { Behavior } from "@enums/Behavior"
import { Icon } from "@iconify/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { formatReadableDate } from "@utils/date"
import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import TextareaAutosize from "react-textarea-autosize"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"
import {
  getUserChatId,
  getUserChats,
  postChatMessage
} from "../../../queries/api"
import { useChatContext } from "@context/ChatContext"
import {
  ChatMessage,
  UserChat,
  mapChatMessage,
  mapUserChat
} from "@models/Chat"

const LogoImg = () => <img src={logo} alt={SITE_NAME} draggable='false' />

const ScrollToBottom = (behavior: Behavior = "smooth") => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: behavior
  })
}

function GemAiPage() {
  const message = useRef<HTMLTextAreaElement>(null)
  const {
    chatId,
    setChatId,
    setWssUrl,
    currentChat,
    setCurrentChat,
    responseInProgress
  } = useChatContext()

  const [access] = useState(true)
  const [asideResponsive, setAsideResponsive] = useState(false)
  const [newConversation, setNewConversation] = useState(true)
  const [conversationInProgress, setConversationInProgress] = useState(true)
  const [conversationActive, setConversationActive] = useState<{
    id: string
    name: string
  } | null>(null)

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

  const handlePostMessage = () => {
    if (message.current) {
      setConversationInProgress(true)

      qPostChatMessage.mutate({ message: message.current.value, chatId })
      setCurrentChat({
        ...currentChat,
        messages: [
          ...currentChat.messages,
          {
            role: "user",
            date: new Date().toString(),
            content: message.current.value
          },
          {
            role: "assistant",
            date: new Date().toString(),
            content: ""
          }
        ]
      })
    }
  }

  const qUserChats = useQuery({
    queryKey: ["userChats", newConversation],
    queryFn: getUserChats,
    select: (data) => data.data.map(mapUserChat)
  })

  const qUserChatId = useQuery({
    queryKey: ["chatMessage", conversationActive],
    queryFn: () => getUserChatId({ id: conversationActive!.id }),
    select: (data) => data.map(mapChatMessage),
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

    return (
      <div className='ai-chat-form'>
        <div className='ai-chat-form-text'>
          <TextareaAutosize
            minRows={min}
            maxRows={max}
            placeholder={placeholder}
            spellCheck='false'
            disabled={!access}
            ref={message}
          />
          <div className='btn-right'>{access ? ButtonSend : ButtonLocked}</div>
          <Corner color='primary' />
        </div>
        <p>
          {CHAT_NAME} can make errors. Remember to check important information.
        </p>
      </div>
    )
  }

  const List = () => {
    const Item = ({ name }: UserChat) => {
      // const actions = [
      //   <Button icon='carbon:pen' color='tertiary'>
      //     Rename
      //   </Button>,
      //   <Button icon='carbon:trash-can' color='secondary' status='danger'>
      //     Delete Chat
      //   </Button>
      // ]

      return (
        <>
          <div className='ai-list-item-title'>{name}</div>
          {/* <Menu sub={actions} /> */}
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
          {qUserChats.data ? (
            qUserChats.data.map((conversation, id) => {
              const active =
                conversationActive &&
                conversation.id === conversationActive.id &&
                !newConversation
              return (
                <li
                  key={id}
                  className={classNames("ai-list-item", { active: active })}
                >
                  <Item key={id} {...conversation} />
                  <div
                    className='ai-list-item-clicker'
                    onClick={() =>
                      setConversation({
                        id: conversation.id,
                        name: conversation.name
                      })
                    }
                    onMouseEnter={() => soundHover()}
                  />
                  <Corner color={active ? "primary" : "tertiary"} />
                </li>
              )
            })
          ) : (
            <li className='ai-list-loader'>
              <Loader />
            </li>
          )}
        </ul>
      </aside>
    )
  }

  const Message = ({ role, content, date }: ChatMessage) => {
    const dateFormat = formatReadableDate(date)

    const menuItems = [
      <Button icon='carbon:bookmark' minus color='tertiary' title='Save' />,
      <Button icon='carbon:copy' minus color='tertiary' title='Copy' />,
      <Button icon='carbon:debug' minus color='tertiary' title='Report' />
    ]

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
          <div className='right'>
            <Menu items={menuItems} />
          </div>
        </div>
        <div className='p'>{content === "" ? <Loader /> : content}</div>
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
              Our AI have the knowledge of GPT, Grok, Mistral, Gemini AI and
              also it's own thoughts: ask anything related to a project that
              exist on our platform such as their note and more details.
            </p>
          </div>
          {!access && (
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
        responseInProgress : {JSON.stringify(responseInProgress)}
        {!newConversation &&
          currentChat.messages.length !== 0 &&
          currentChat.messages.map((message, id) => (
            <Message key={id} {...message} />
          ))}
        {(newConversation || !currentChat.messages.length) && (
          <NewConversation />
        )}
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

              {/* <div style={{ padding: "40px" }}>
                responseInProgress : {JSON.stringify(responseInProgress)}
                <br />
                currentResponse : {currentResponse}
              </div> */}
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
