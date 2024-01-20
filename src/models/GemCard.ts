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
  launchpad: string
  status: number
  tokenSymbol: string
}

export interface ApiGem {
  amountRaised: number
  analyzed: boolean
  area_project?: string
  audit: boolean
  auditLink: string
  baseSymbol: string
  blockchain_area?: string
  category?: string
  chain: number
  chains: string[]
  endTime: string
  gemini_raw?: string
  gemini_score?: string
  githubLink: string | null
  gpt_raw?: string
  gpt_score?: string
  hardCap: number | null
  kyc: boolean
  launchpad: string
  launchpads: string[]
  logoLink: string
  mistral_raw?: string
  mistral_score?: string
  poolType: string
  presaleAddress: string
  redditLink: string | null
  safu: boolean
  saleToken: string
  softCap: number
  source: string
  startTime: string
  status: number
  submittedDescription: string
  telegramLink: string
  telegramMemberCount: number
  telegramOnlineCount?: number | null
  tokenName: string
  tokenSymbol: string
  twitterLink: string
  uniqueKey: string
  updatedAt?: string
  websiteLink: string
  _id: string
}

export const mapGem = (data: ApiGem): Gem => {
  const note: NoteInfo = {
    total: null,
    analyser: []
  }

  if (data.analyzed) {
    note.total = 0

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
  }

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
    category: data.category ?? "",
    note,
    href: data.websiteLink,
    desc: data.submittedDescription,
    socials,
    chains: data.chains,
    launchpad: data.launchpad,
    status: data.status,
    tokenSymbol: data.tokenSymbol
  }
}
