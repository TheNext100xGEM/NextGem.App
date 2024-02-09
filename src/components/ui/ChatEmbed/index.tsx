import { Embed } from "@models/ChatEmbed"
import "./_embed.scss"
import GemCard from "@components/GemCard"
import { Item } from ".."

function ChatEmbed({embed}: {embed: Embed}) {
  return (
    <Item className="embed">
        {embed.type === 'project' && <GemCard {...embed.data}/>}
    </Item>
  )
}

export default ChatEmbed
