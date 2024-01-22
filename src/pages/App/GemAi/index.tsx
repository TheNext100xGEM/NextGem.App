import "./_gemAi.scss"
import logo from "@assets/img/logo-next-gem.webp"
import { Alert, Button, Corner, Menu } from "@components/ui"
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
import { conversations } from "@data/TEST_conversations"
import { Behavior } from "@enums/Behavior"
import { Icon } from "@iconify/react"
import { PropsConversation, PropsMessage } from "@models/Ai"
import { useMutation } from "@tanstack/react-query"
import { formatReadableDate } from "@utils/date"
import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import TextareaAutosize from "react-textarea-autosize"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"
import { postChatMessage } from "../../../queries/api"
import { useChatContext } from "@context/ChatContext"

const LogoImg = () => <img src={logo} alt={SITE_NAME} draggable='false' />

const ScrollToBottom = (behavior: Behavior = "smooth") => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: behavior
  })
}

function GemAiPage() {
  const message = useRef<HTMLTextAreaElement>(null)
  const { chatId, setStreamId, currentResponse, responseInProgress } =
    useChatContext()

  const [access] = useState(true)
  const [asideResponsive, setAsideResponsive] = useState(false)
  const [newConversation, setNewConversation] = useState(true)
  const [conversationActive, setConversationActive] = useState(9)
  const conversation = conversations[conversationActive]

  const [soundClick] = useSound(SOUND_BUTTON_CLICK, {
    volume: VOLUME_BUTTON_CLICK
  })
  const [soundHover] = useSound(SOUND_BUTTON_HOVER, {
    volume: VOLUME_BUTTON_HOVER
  })

  useEffect(() => ScrollToBottom("instant"), [])

  const qChatMessage = useMutation({
    mutationFn: postChatMessage
  })

  useEffect(() => {
    if (qChatMessage.data) {
      setStreamId(qChatMessage.data.streamId)
    }
  }, [qChatMessage.data, setStreamId])

  const handlePostMessage = () => {
    if (message.current) {
      qChatMessage.mutate({ message: message.current.value, chatId })
    }
  }

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
    const Item = ({ title }: PropsConversation) => {
      const actions = [
        <Button icon='carbon:pen' color='tertiary'>
          Rename
        </Button>,
        <Button icon='carbon:trash-can' color='secondary' status='danger'>
          Delete Chat
        </Button>
      ]

      return (
        <>
          <div className='ai-list-item-title'>{title}</div>
          <Menu sub={actions} />
        </>
      )
    }

    const setConversation = (id: number) => {
      setNewConversation(false)
      setConversationActive(id)
      soundClick()
      ScrollToBottom()
      setAsideResponsive(false)
    }

    const handleNewConversation = () => {
      setNewConversation(true)
      setAsideResponsive(false)
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
          {conversations &&
            conversations.map((conversation, id) => {
              const active = id === conversationActive && !newConversation
              return (
                <li
                  key={id}
                  className={classNames("ai-list-item", { active: active })}
                >
                  <Item key={id} {...conversation} />
                  <div
                    className='ai-list-item-clicker'
                    onClick={() => setConversation(id)}
                    onMouseEnter={() => soundHover()}
                  />
                  <Corner color={active ? "primary" : "tertiary"} />
                </li>
              )
            })}
        </ul>
      </aside>
    )
  }

  const Message = ({ author, message, date }: PropsMessage) => {
    const dateFormat = formatReadableDate(date)

    const menuItems = [
      <Button icon='carbon:bookmark' minus color='tertiary' title='Save' />,
      <Button icon='carbon:copy' minus color='tertiary' title='Copy' />,
      <Button icon='carbon:debug' minus color='tertiary' title='Report' />
    ]

    return (
      <li className={classNames("message", author)}>
        <div className='avatar'>
          {author == "ai" ? <LogoImg /> : <Icon icon='carbon:user' />}
        </div>
        <div className='top'>
          <div className='author'>
            <strong>{author === "user" ? "You" : CHAT_NAME}</strong>
            <time>{dateFormat}</time>
          </div>
          <div className='right'>
            <Menu items={menuItems} />
          </div>
        </div>
        <div className='p'>{message}</div>
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
        {conversation !== undefined &&
          conversation.messages.map((message, id) => (
            <Message key={id} {...message} />
          ))}
        {newConversation && <NewConversation />}
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
