import './_socials.scss'
import { DISCORD, GITHUB, SOUND_BUTTON_CLICK, TELEGRAM, TWITTER, VOLUME_BUTTON_CLICK } from '@constants/index'
import { Icon } from '@iconify/react'
import { PropsSociaList, PropsSocialLink, SocialId, SocialInfo, SocialListInfos } from '@models/Socials'
import { FC } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from 'use-sound'

const getSocialInfo = (id: SocialId): SocialInfo => {
  const socialInfo = SocialListInfos.find(socialInfo => socialInfo.id === id)
  if (!socialInfo) {
    throw new Error(`Cannot find social ${id}`)
  }
  return socialInfo
}

export const SocialLink: FC<PropsSocialLink> = ({ id, href }) => {
  const socialInfo = getSocialInfo(id)
  const { name, icon } = socialInfo

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>
      <Icon icon={icon} />
    </a>
  )
}

export const SocialList = ({ items }: PropsSociaList) => {
  const [soundClick] = useSound(SOUND_BUTTON_CLICK, { volume: VOLUME_BUTTON_CLICK })

  return (
    <ul className="socials">
      {items.map(item => (
        <li key={item.id} onClick={soundClick}>
          <SocialLink id={item.id} href={item.href} />
        </li>
      ))}
    </ul>
  )
}

export const SocialListNext = () => {
  const socialLinks: PropsSocialLink[] = [
    {
      id: "twitter",
      href: TWITTER
    },
    {
      id: "telegram",
      href: TELEGRAM
    },
    {
      id: "github",
      href: GITHUB
    },
    {
      id: "discord",
      href: DISCORD
    }
  ]

  return <SocialList items={socialLinks} />
}