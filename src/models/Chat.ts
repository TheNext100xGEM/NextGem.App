export type ApiChat = {
  wssUrl: string
  chatId?: string
  assignedName: string
}

export type ApiChatMessage = {
  chat_id: string
  role: string
  content: string
  createdAt: string
  updatedAt: string
}

export type ChatMessage = {
  role: string
  content: string
  date: string
}

export const mapChatMessage = (data: ApiChatMessage): ChatMessage => {
  return {
    role: data.role,
    content: data.content,
    date: data.updatedAt
  }
}

export type CurrentChat = {
  title: string
  messages: ChatMessage[]
}

export type ApiUserChat = {
  _id: string
  createdAt: string
  name: string
  updatedAt: string
  user_id: string
}

export type ApiUserChats = {
  data: ApiUserChat[];
  status: boolean
}

export type UserChat = {
  id: string
  name: string
}

export const mapUserChat = (data: ApiUserChat): UserChat => {
  return {
    id: data._id,
    name: data.name
  }
}