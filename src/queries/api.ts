import { ApiGem } from "@models/GemCard"
import { APP_API_URL } from "../libs/constants"
import { ApiCollection } from "@models/API"
import { ApiChat } from "@models/Chat"

export const getGemCollection = async ({ pageParam = 0 }) =>
  request<ApiCollection<ApiGem>>(
    `${APP_API_URL}/projects?limit=20&page=${pageParam}`,
    "gemCollection",
    "GET"
  )

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
