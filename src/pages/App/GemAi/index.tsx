import "./_gemAi.scss"
import logo from "@assets/img/logo-next-gem.webp"
import Form from "@components/GemAi/Form"
import List from "@components/GemAi/List"
import { Alert, Button } from "@components/ui"
import { CHAT_NAME, SITE_NAME } from "@constants/index"
import { useAppContext } from "@context/AppContext"
import { useChatContext } from "@context/ChatContext"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"

const LogoImg = () => <img src={logo} alt={SITE_NAME} draggable='false' />

function GemAiPage() {
  const { isPremium } = useAppContext()
  const { reset } = useChatContext()

  useEffect(() => reset(), [])

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
              <div className='start'>
                <LogoImg />
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
                      You don't have access to <strong>{CHAT_NAME} Beta</strong>.
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
