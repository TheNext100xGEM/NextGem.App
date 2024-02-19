import { Button, Corner } from "@components/ui"
import { CHAT_NAME, SOUND_SEND_MESSAGE } from "@constants/index"
import { useAppContext } from "@context/AppContext"
import { useChatContext } from "@context/ChatContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { postChatMessage } from "../../../queries/api"
import { useParams } from "react-router-dom"

const min = 1
const max = 7
const placeholder = `Message to ${CHAT_NAME}…`
const loadingPlaceholder = `${CHAT_NAME} is responding…`

function Form() {
    const { chatId } = useParams()

  const message = useRef<HTMLTextAreaElement>(null)

  const queryClient = useQueryClient()
  const { isPremium } = useAppContext()
  const {
    setChatId,
    currentChat,
    setCurrentChat,
    responseInProgress,
    setResponseInProgress,
    setWssUrl
  } = useChatContext()

  const qPostChatMessage = useMutation({
    mutationFn: postChatMessage
  })

  useEffect(() => {
    if (qPostChatMessage.data) {
      setWssUrl(qPostChatMessage.data.wssUrl)
      if (qPostChatMessage.data.chatId) {
        setChatId(qPostChatMessage.data.chatId)
      }
    }
  }, [qPostChatMessage.data])

  const handlePostMessage = async () => {
    
    if (message.current) {
      const userMessage = message.current.value

      message.current.value = ""

      setResponseInProgress(true)

      await qPostChatMessage.mutateAsync({ message: userMessage, chatId })
      if (!chatId) {
        await queryClient.invalidateQueries({ queryKey: ["userChats"] })
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
          placeholder={responseInProgress ? loadingPlaceholder : placeholder}
          spellCheck='false'
          disabled={disabled}
          ref={message}
          onKeyDown={handleKeyPress}
        />
        <div className='btn-right'>
          {disabled ? (
            <Button
              icon={responseInProgress ? "eos-icons:three-dots-loading" : 'carbon:locked'}
              minus
              color='tertiary'
              status='warning'
              className='locked'
            />
          ) : (
            <Button
              icon='carbon:send'
              minus
              color='tertiary'
              pathSoundClick={SOUND_SEND_MESSAGE}
              onClick={handlePostMessage}
            />
          )}
        </div>
        <Corner color='primary' />
      </div>
      <p>
        {CHAT_NAME} can make errors. Remember to check important information.
      </p>
    </div>
  )
}

export default Form
