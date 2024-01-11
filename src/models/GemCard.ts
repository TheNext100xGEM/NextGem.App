import { NoteInfo } from "./Note"
import { PropsSocialLink } from "./Socials"

export interface Launchpad {
  name: string
  href: string
}

export interface Gem {
  name: string
  category: string
  note: NoteInfo
  href: string
  desc: string
  socials: PropsSocialLink[]
  chains: string[]
  launchpad: string[]
  status: number
}

export interface ApiGem {
  chains: string[]
  launchpads: string[]
  _id: string
  uniqueKey: string
  tokenName: string
  tokenSymbol: string
  websiteLink: string
  twitterLink: string | null
  whitepaperLink: string | null
  telegramLink: string | null
  githubLink: string | null
  gitbookLink: string | null
  submittedDescription: string
  status: number
  initialMarketCap: number
  athMarketCap: number | null
  logoLink: string
  source: string
  analyzed: boolean
  gemini_raw?: string
  gemini_score?: string
  gpt_raw?: string
  gpt_score?: string
  mistral_raw?: string
  mistral_score?: string
}

export const mapGem = (data: ApiGem): Gem => {
  const note: NoteInfo = {
    total: 0,
    analyser: []
  }

  if (data.gpt_score) {
    note.total += parseInt(data.gpt_score)
    note.analyser.push("GPT")
  }
  if (data.gemini_score) {
    note.total += parseInt(data.gemini_score)
    note.analyser.push("Gemini")
  }
  if (data.mistral_score) {
    note.total += parseInt(data.mistral_score)
    note.analyser.push("Mistral")
  }
  note.total = Math.round(note.total / note.analyser.length)

  const socials: PropsSocialLink[] = []

  if (data.twitterLink) {
    socials.push({
      id: "twitter",
      href: data.twitterLink
    })
  }

  if (data.telegramLink) {
    socials.push({
      id: "telegram",
      href: data.telegramLink
    })
  }

  if (data.githubLink) {
    socials.push({
      id: "github",
      href: data.githubLink
    })
  }

  return {
    name: data.tokenName,
    category: "category",
    note,
    href: data.websiteLink,
    desc: data.submittedDescription,
    socials,
    chains: data.chains,
    launchpad: data.launchpads,
    status: data.status
  }
}
