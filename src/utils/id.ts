export function generateId(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
  const idLength = 32

  let id = ""

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    id += characters.charAt(randomIndex)
  }

  return id
}
