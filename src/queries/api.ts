import { ApiGem } from "@models/GemCard"
import { APP_API_URL } from "../libs/constants"
import { ApiCollection } from "@models/API"

export const getGemCollection = async ({ pageParam = 0 }) =>
  request<ApiCollection<ApiGem>>(
    `${APP_API_URL}/projects?limit=20&page=${pageParam}`,
    "gemCollection",
    "GET"
  )

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
