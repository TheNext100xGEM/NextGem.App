import { NoteInfo } from './Note'
import { PropsSocialLink } from './Socials'

export interface Launchpad {
  name: string
  href: string
}

export interface PropsGemCard {
  name: string
  category: string
  note: NoteInfo
  href: string
  desc: string
  socials: PropsSocialLink[]
  chains: string[]
  launchpad: Launchpad[]
}