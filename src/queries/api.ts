import { ApiGem } from "@models/GemCard"
import { APP_API_URL } from "../libs/constants"
import { ApiCollection } from "@models/API"
import { ApiChat } from "@models/Chat"

export const getGemCollection = async ({
  page = 0,
  limit = 20,
  categories,
  noteMin,
  noteMax,
  chains,
  searchQuery
}: {
  page?: number
  limit?: number
  categories?: string[]
  noteMin?: number
  noteMax?: number
  chains?: string[]
  searchQuery?: string
}) => {
  const queryString = Object.entries({
    page,
    limit,
    categories: categories && categories.length ? JSON.stringify(categories) : undefined,
    noteMin,
    noteMax,
    chains: chains && chains.length ? JSON.stringify(chains) : undefined,
    searchQuery
  })
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  const url = `${APP_API_URL}/projects?${queryString}`

  return request<ApiCollection<ApiGem>>(url, "gemCollection", "GET")
}

export const getGemSingle = async ({ id }: { id: string }) =>
  request<ApiGem>(`${APP_API_URL}/projects/${id}`, "gemSingle", "GET")

export const postChatMessage = async (body: {
  message: string
  chatId: string
}) => request<ApiChat>(`${APP_API_URL}/chat`, "chatMessage", "POST", body)

// Functions
async function request<T>(
  url: string,
  name: string,
  method: "GET" | "POST" = "GET",
  body?: any
) {
  const response: Response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: method === "POST" ? JSON.stringify(body) : undefined
  })

  if (!response.ok) {
    throw new Error(`${name} call failed.`)
  }

  const data: T = await response.json()

  return data
}
