import { ApiCollection } from "@models/API"
import { ApiChat, ApiChatMessage, ApiUserChats } from "@models/Chat"
import { ApiGem } from "@models/GemCard"
import { ApiGemFull } from "@models/GemFull"
import Cookies from "js-cookie"

import { APP_API_URL } from "../libs/constants"

export type ApiStatusReponse = {
  status: boolean
  message?: string
}

export const getGemCollection = async ({
  page = 0,
  limit = 20,
  categories,
  noteMin,
  noteMax,
  chains,
  searchQuery,
  sortBy
}: {
  page?: number
  limit?: number
  categories?: string[]
  noteMin?: number
  noteMax?: number
  chains?: string[]
  searchQuery?: string
  sortBy?: string[]
}) => {
  const queryString = Object.entries({
    page,
    limit,
    categories:
      categories && categories.length ? JSON.stringify(categories) : undefined,
    noteMin,
    noteMax,
    chains: chains && chains.length ? JSON.stringify(chains) : undefined,
    searchQuery,
    sortBy: sortBy && sortBy.length ? JSON.stringify(sortBy) : undefined
  })
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  const url = `${APP_API_URL}/projects?${queryString}`

  return request<ApiCollection<ApiGem>>(url, "getGemCollection", "GET")
}

export const getGemSingle = async ({ id }: { id: string }) =>
  request<ApiGemFull>(`${APP_API_URL}/projects/${id}`, "getGemSingle", "GET")


export const getUserChats = async () =>
  request<ApiUserChats | ApiStatusReponse>(`${APP_API_URL}/user/chats`, "getUserChats", "GET")

  export const deleteUserChat = async (body: {
    chatId: string
  }) => request<ApiStatusReponse>(`${APP_API_URL}/user/chats/delete`, "deleteUserChat", "POST", body)

export const getUserChatId = async ({ id }: { id: string }) =>
  request<ApiChatMessage[]>(`${APP_API_URL}/chat/history/${id}`, "getUserChatId", "GET")

export const postChatMessage = async (body: {
  message: string
  chatId?: string
}) => request<ApiChat>(`${APP_API_URL}/chat`, "postChatMessage", "POST", body)

export const postUserFavorite = async (body: {
  projectId: string
}) => request<ApiStatusReponse>(`${APP_API_URL}/user/favorites`, "postUserFavorite", "POST", body)

export const postReloadAnalysis = async (body: {
    projectId: string
  }) => request<ApiStatusReponse>(`${APP_API_URL}/projects/reload`, "postReloadAnalysis", "POST", body)

export const deleteUserFavorite = async (body: {
  projectId: string
}) => request<ApiStatusReponse>(`${APP_API_URL}/user/favorites/delete`, "deleteUserFavorite", "POST", body)

// Functions
async function request<T>(
  url: string,
  name: string,
  method: "GET" | "POST" = "GET",
  body?: any
) {
  // Récupérer le token depuis les cookies
  const token = Cookies.get("web3TokenAuth")

  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  }

  // Ajouter le token à l'en-tête Authorization s'il existe
  if (token) {
    headers["Authorization"] = token
  }

  const response: Response = await fetch(url, {
    method: method,
    headers: headers,
    body: method === "POST" ? JSON.stringify(body) : undefined
  })

  if (!response.ok) {
    throw new Error(`${name} call failed.`)
  }

  const data: T = await response.json()

  return data
}
