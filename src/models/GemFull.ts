import { NoteInfo } from "./Note"
import { PropsSocialLink } from "./Socials"

export interface Launchpad {
  name: string
  href: string
}

export interface GemFull {
  id: string
  name: string
  category: string
  isFavorite: boolean
  href: string
  description: string
  chains: string[]
  launchpad: string
  tokenSymbol: string
  note: NoteInfo
  status?: number
  socials: PropsSocialLink[]
  hasSummary : boolean
  analyzeProgress: analyzeProgress;
  gemini_raw?: string;
  gemini_score?: string;
  gpt_raw?: string;
  gpt_score?: string;
  mistral_raw?: string;
  mistral_score?: string;
  analyzed?: boolean;
}

export interface analyzeProgress { 
    eta: number,
    progress: number,
    analyzeState: 'analyzed' | 'analyzing' | 'queue',
    positionInQueue: number,
    totalInQueue: number
}

export interface ApiGemFull {
  _id: string;
  uniqueKey: string;
  presaleAddress: string;
  tokenName: string;
  tokenSymbol: string;
  baseSymbol: string;
  saleToken: string;
  audit: boolean;
  isFavorite: boolean;
  auditLink: string;
  kyc: boolean;
  safu: boolean;
  softCap: number;
  hardCap: number | null;
  amountRaised: number;
  telegramLink?: string;
  twitterLink?: string;
  websiteLink?: string;
  submittedDescription: string;
  githubLink?: string | null;
  redditLink?: string | null;
  logoLink: string;
  startTime: string;
  endTime: string;
  poolType: string;
  chain: number;
  status: number;
  telegramMemberCount: number;
  telegramOnlineCount: number | null;
  launchpad: string;
  source: string;
  chains: string[];
  launchpads: string[];
  analyzed: boolean;
  blockchain_area: string;
  gemini_raw?: string;
  gemini_score?: string;
  gpt_raw?: string;
  gpt_score?: string;
  mistral_raw?: string;
  mistral_score?: string;
  category: string;
  updatedAt: string;
  area_project: string;
  llm_summary?: string;
  weighted_score: number;
  analyzeProgress: analyzeProgress;
}

export const mapGemFull = (data: ApiGemFull): GemFull => {
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

  const note: NoteInfo = {
    total: 0,
    analyser: []
  }

  if (data.gpt_score) {
    note.total! += parseInt(data.gpt_score)
    note.analyser.push("GPT")
  }
  if (data.gemini_score) {
    note.total! += parseInt(data.gemini_score)
    note.analyser.push("Gemini")
  }
  if (data.mistral_score) {
    note.total! += parseInt(data.mistral_score)
    note.analyser.push("Mistral")
  }
  note.total = Math.round(note.total! / note.analyser.length)

  return {
    id: data._id,
    name: data.tokenName,
    category: data.category ?? "",
    href: data.websiteLink ?? '',
    description: data.llm_summary ?? data.submittedDescription,
    hasSummary: !!data.llm_summary,
    chains: data.chains,
    launchpad: data.launchpad,
    tokenSymbol: data.tokenSymbol,
    note,
    isFavorite: data.isFavorite,
    gemini_score: data.gemini_score,
    gemini_raw: data.gemini_raw,
    gpt_score: data.gpt_score,
    gpt_raw: data.gpt_raw,
    mistral_score: data.mistral_score,
    mistral_raw: data.mistral_raw,
    status: data.status,
    analyzed: data.analyzed,
    analyzeProgress: data.analyzeProgress,
    socials
  }
}
