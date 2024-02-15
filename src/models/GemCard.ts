import { PropsSocialLink } from "./Socials"

export interface Launchpad {
  name: string
  href: string
}

export interface Gem {
  id: string
  name: string
  slug: string
  category: string
  href: string
  description: string
  chains: string[]
  launchpad: string
  token: string
  llmList: string[]
  weightedScore?: number
  status?: number
  isFavorite: boolean
  isTrending: boolean
  socials: PropsSocialLink[]
}

export interface ApiGem {
  id: string
  name: string
  slug: string
  category?: string
  href: string
  description: string
  chains: string[]
  launchpad: string
  tokenSymbol: string
  llmList: string[]
  weightedScore: number | "none"
  status?: number
  isFavorite: boolean
  isTrending: boolean
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
    slug: data.slug,
    category: data.category ?? "",
    isFavorite: data.isFavorite,
    isTrending: data.isTrending,
    href: data.href,
    description: data.description,
    chains: data.chains,
    launchpad: data.launchpad,
    token: data.tokenSymbol,
    llmList: data.llmList,
    weightedScore:
      typeof data.weightedScore === "number" ? data.weightedScore : undefined,
    status: data.status,
    socials
  }
}
