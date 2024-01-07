export type PropsMessage = {
  author: string
  message: string
  date: string
}

export type PropsConversation = {
  title: string
  last: string
  messages: PropsMessage[]
}