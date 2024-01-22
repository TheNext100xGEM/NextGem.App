export interface Launchpad {
  name: string
  href: string
}

export interface Gem {
  id: string
  name: string
  category: string
  href: string
  description: string
  chains: string[]
  launchpad: string
  tokenSymbol: string
  llmList: string[]
  weightedScore?: number
}

export interface ApiGem {
  id: string
  name: string
  category?: string
  href: string
  description: string
  chains: string[]
  launchpad: string
  tokenSymbol: string
  llmList: string[]
  weightedScore: number | "none"
}

export const mapGem = (data: ApiGem): Gem => {
  // const socials: PropsSocialLink[] = []

  // if (data.twitterLink) {
  //   socials.push({
  //     id: "twitter",
  //     href: data.twitterLink
  //   })
  // }

  // if (data.telegramLink) {
  //   socials.push({
  //     id: "telegram",
  //     href: data.telegramLink
  //   })
  // }

  // if (data.githubLink) {
  //   socials.push({
  //     id: "github",
  //     href: data.githubLink
  //   })
  // }

  return {
    id: data.id,
    name: data.name,
    category: data.category ?? "",
    href: data.href,
    description: data.description,
    chains: data.chains,
    launchpad: data.launchpad,
    tokenSymbol: data.tokenSymbol,
    llmList: data.llmList,
    weightedScore:
      typeof data.weightedScore === "number" ? data.weightedScore : undefined
  }
}
