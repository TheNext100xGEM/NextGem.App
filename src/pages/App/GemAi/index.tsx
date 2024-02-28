import "./_gemAi.scss"
import logo from "@assets/img/logo-next-gem.webp"
import Form from "@components/GemAi/Form"
import List from "@components/GemAi/List"
import Message from "@components/GemAi/Message"
import { Alert, Button } from "@components/ui"
import { CHAT_NAME, SITE_NAME } from "@constants/index"
import { useAppContext } from "@context/AppContext"
import { useChatContext } from "@context/ChatContext"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"

function GemAiPage() {
  const { isPremium } = useAppContext()
  const { responseInProgress, currentChat, reset } = useChatContext()

  const [asideResponsive, setAsideResponsive] = useState(false)

  useEffect(() => reset(), [])

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
            <div className={classNames("ai-chat", { inProgress: responseInProgress })}>
              {currentChat.messages.length !== 0 && (
                <ul className='ai-chat-content'>
                  {currentChat.messages.map((message, id) => (
                    <Message
                      key={id}
                      {...message}
                      last={id === currentChat.messages.length - 1}
                    />
                  ))}
                </ul>
              )}

              {currentChat.messages.length === 0 && (
                <div className='start'>
                  <img src={logo} alt={SITE_NAME} draggable='false' />
                  <h4>Welcome to {CHAT_NAME}</h4>
                  <div className='intro'>
                    <p>
                      The Nextgem LLM is comprised of knowledge garnered through
                      the analysis of multiple LLM models such as GPT, Grok,
                      Mistral and Gemini AI.
                      <br />
                      Ask any question related to any project(s) below.
                    </p>
                  </div>
                  {!isPremium && (
                    <>
                      <Alert status='warning'>
                        You don't have access to{" "}
                        <strong>{CHAT_NAME} Beta</strong>.
                      </Alert>
                      <Button
                        href='/staking'
                        icon='carbon:shopping-cart'
                        status='success'
                      >
                        Get Beta Access
                      </Button>
                    </>
                  )}
                </div>
              )}

              <Form />
            </div>
          </div>
        </div>
        <div className='ai-bg'></div>
      </div>
    </>
  )
}

export default GemAiPage
