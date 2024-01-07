export const SocialListInfos = [
  {
    id: "twitter" as string | const,
    name: 'X - Twitter',
    icon: 'ri:twitter-x-line',
  },
  {
    id: "telegram" as string | const,
    name: 'Telegram',
    icon: 'ph:telegram-logo',
  },
  {
    id: "github" as string | const,
    name: 'GitHub',
    icon: 'ri:github-line',
  },
  {
    id: "discord" as string | const,
    name: 'Discord',
    icon: 'ri:discord-line',
  },
  {
    id: "reddit" as string | const,
    name: 'Reddit',
    icon: 'ri:reddit-line',
  },
  {
    id: "instagram" as string | const,
    name: 'Instagram',
    icon: 'ri:instagram-line',
  },
  {
    id: "linkedin" as string | const,
    name: 'LinkedIn',
    icon: 'ri:linkedin-fill',
  },
  {
    id: "facebook" as string | const,
    name: 'Facebook',
    icon: 'ri:facebook-fill',
  },
  {
    id: "medium" as string | const,
    name: 'Medium',
    icon: 'ri:medium-fill',
  },
  {
    id: "threads" as string | const,
    name: 'Threads',
    icon: 'ri:threads-fill',
  },
  {
    id: "coinmarketcap" as string | const,
    name: 'CoinMarketCap',
    icon: 'simple-icons:coinmarketcap',
  }
] as const

export type SocialId = typeof SocialListInfos[number]['id']

export type SocialInfo = {
  id: SocialId
  name: string
  icon: string
}

export type PropsSocialLink = {
  id: SocialId
  href: string
}

export interface PropsSociaList {
  items: PropsSocialLink[]
}