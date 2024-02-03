export type ApiChat = {
  wssUrl: string
  chatId?: string
}

export type ChatMessage = {
  role: string
  content: string
  date: string
}

export type CurrentChat = {
  title: string
  messages: ChatMessage[]
}
