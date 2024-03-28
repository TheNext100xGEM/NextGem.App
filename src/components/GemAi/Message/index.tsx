import logo from "@assets/img/logo-next-gem.webp"
import { Grid, Loader } from "@components/ui"
import ChatEmbed from "@components/ui/ChatEmbed"
import Markdown from "@components/ui/Markdown"
import { CHAT_NAME, SITE_NAME } from "@constants/index"
import { useChatContext } from "@context/ChatContext"
import { Icon } from "@iconify/react/dist/iconify.js"
import { ChatMessage } from "@models/Chat"
import { formatReadableDate } from "@utils/date"
import classNames from "classnames"

function Message({
  last,
  role,
  content,
  date,
  embeds,
  contextResponse
}: ChatMessage & { last: boolean }) {
  const dateFormat = formatReadableDate(date)

  const { responseInProgress } = useChatContext()

  // const menuItems = [
  //   <Button icon='carbon:bookmark' minus color='tertiary' title='Save' />,
  //   <Button icon='carbon:copy' minus color='tertiary' title='Copy' />,
  //   <Button icon='carbon:debug' minus color='tertiary' title='Report' />
  // ]

  return (
    <li className={classNames("message", role)}>
      <div className='avatar'>
        {role === "assistant" ? (
          <img src={logo} alt={SITE_NAME} draggable='false' />
        ) : (
          <Icon icon='carbon:user' />
        )}
        <div className='avatar-loader'>
          {last && role === "assistant" && responseInProgress && <Loader />}
        </div>
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
        </>
      )}
      {contextResponse && <Markdown>{contextResponse}</Markdown>}
    </li>
  )
}

export default Message
