import "./_embed.scss"
import GemCard from "@components/GemCard"
import { Embed } from "@models/ChatEmbed"
import { Gem } from "@models/GemCard"

import { Item } from ".."

function ChatEmbed({embed}: {embed: Embed}) {
  return (
    <Item className="embed">
        {embed.type === 'project' && <GemCard {...embed.data as Gem}/>}
    </Item>
  )
}

export default ChatEmbed
