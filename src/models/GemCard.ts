import { PropsSocialLink } from "./Socials"

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
  status?: number
  socials: PropsSocialLink[]
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
  status?: number
  socials: {
    telegram?: string
    twitter?: string
  }
}

export const mapGem = (data: ApiGem): Gem => {
  const socials: PropsSocialLink[] = []

  if (data.socials.twitter) {
    socials.push({
      id: "twitter",
      href: data.socials.twitter
    })
  }

  if (data.socials.telegram) {
    socials.push({
      id: "telegram",
      href: data.socials.telegram
    })
  }

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
      typeof data.weightedScore === "number" ? data.weightedScore : undefined,
    status: data.status,
    socials
  }
}
