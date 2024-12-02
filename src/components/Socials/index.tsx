import "./_socials.scss"
import {
  DISCORD,
  GITHUB,
  SOUND_BUTTON_CLICK,
  TELEGRAM,
  TWITTER,
  COINMARKETCAP,
  VOLUME_BUTTON_CLICK,
  DEXTOOLS
} from "@constants/index"
import { Icon } from "@iconify/react"
import {
  PropsSociaList,
  PropsSocialLink,
  SocialId,
  SocialInfo,
  SocialListInfos
} from "@models/Socials"
import { FC } from "react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"

const getSocialInfo = (id: SocialId): SocialInfo => {
  const socialInfo = SocialListInfos.find((socialInfo) => socialInfo.id === id)
  if (!socialInfo) {
    throw new Error(`Cannot find social ${id}`)
  }
  return socialInfo
}

export const SocialLink: FC<PropsSocialLink> = ({ id, href }) => {
  const socialInfo = getSocialInfo(id)
  const { name, icon } = socialInfo

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={name}
      title={name}
    >
      <Icon icon={icon} />
    </a>
  )
}

export const SocialList = ({ items }: any) => {
  const [soundClick] = useSound(SOUND_BUTTON_CLICK, {
    volume: VOLUME_BUTTON_CLICK
  })

  return (
    <ul className='socials'>
      {items.map((item: any) => (
        <li key={item.id} onClick={soundClick}>
          <SocialLink id={item.id} href={item.href} />
        </li>
      ))}
      <li>
        <a
          href={DEXTOOLS}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={"Dextools"}
          title={"Dextools"}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='img'
            className='iconify iconify--simple-icons'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M9.43753 1.35709C8.06753 2.10186 6.94669 2.73209 6.94692 2.75773C6.94753 2.82389 10.235 4.56135 10.3516 4.55712C10.4047 4.55526 10.7898 4.37029 11.2072 4.14613L11.9664 3.73863L12.7955 4.18339L13.6246 4.62823L14.9824 3.99153C17.0283 3.03211 17.2408 2.92697 17.2075 2.89165C17.1633 2.84479 16.4294 2.43338 14.4385 1.33954C13.4764 0.810875 12.5425 0.292535 12.3632 0.18765C12.184 0.0827638 12.0128 -0.0016099 11.9829 2.33167e-05C11.953 0.00165654 10.8076 0.612342 9.43753 1.35709ZM3.42873 4.60432L2.00257 5.37309V8.7471C2.00257 10.6028 2.0213 12.1211 2.04427 12.1211C2.06716 12.1211 2.76883 11.8037 3.6035 11.4157L5.12109 10.7103V7.15388L5.86268 7.57553C6.43414 7.90015 7.00594 8.2241 7.57809 8.5474L8.55188 9.09763L8.9852 8.89315C9.25696 8.7647 9.52817 8.635 9.79883 8.50405C10.008 8.40241 10.5214 8.16108 10.9397 7.96767C11.3581 7.77417 11.7453 7.5796 11.8002 7.53525C11.8732 7.47634 10.9837 6.9634 8.51043 5.63795C6.6461 4.63883 5.06093 3.82455 4.98783 3.82845C4.91472 3.83236 4.21313 4.18145 3.42873 4.60432ZM17.4645 4.8202C16.4932 5.27781 15.6978 5.6705 15.6969 5.6929C15.6961 5.71526 16.2254 6.04376 16.8734 6.42278C17.5213 6.80188 18.0514 7.13232 18.0514 7.1572C18.0514 7.18203 17.4781 7.47194 16.7774 7.80158C16.0767 8.13113 14.3054 8.96589 12.8413 9.65663L7.93533 11.9709C6.70125 12.5531 5.58886 13.0778 5.46337 13.1372C2.94268 14.328 2.24984 14.6584 2.15469 14.7152C2.05902 14.7723 2.03735 15.104 2.02032 16.7692L2 18.7552L3.27533 19.4333L4.55064 20.1114L6.31905 19.2785C7.2917 18.8205 8.08745 18.4217 8.08745 18.3923C8.08745 18.363 7.90772 18.2408 7.68814 18.1206C7.46846 18.0004 7.01499 17.7344 6.68032 17.5292C6.34568 17.3241 6.01199 17.1359 5.93873 17.1109C5.86549 17.086 5.80663 17.0425 5.80783 17.0141C5.80905 16.9858 6.58777 16.5997 7.53822 16.1562C9.3843 15.2948 10.7971 14.6309 13.8301 13.1996C15.1863 12.5596 16.5427 11.9201 17.8993 11.2809C19.0916 10.7193 20.4778 10.0634 20.9798 9.82336L21.8925 9.3869L21.9128 7.37829L21.9332 5.36977L20.6397 4.6769C19.9283 4.29586 19.3201 3.98502 19.2883 3.98616C19.2564 3.98721 18.4357 4.36249 17.4645 4.8202ZM21.546 12.0665C21.3554 12.1637 20.9789 12.3456 20.7093 12.4707C20.4398 12.5959 19.9283 12.8367 19.5727 13.0061L18.9261 13.3138L18.9114 15.0772C18.9032 16.047 18.869 16.8362 18.8353 16.8311C18.7588 16.8192 17.5471 16.1707 16.329 15.4895C15.4499 14.998 15.3947 14.9785 15.1881 15.0852C15.0687 15.147 14.3549 15.4811 13.6019 15.8278C12.8489 16.1744 12.2082 16.4807 12.1781 16.5085C12.148 16.5361 13.6636 17.3934 15.546 18.4135L18.9685 20.2682L20.4306 19.4789C21.2346 19.0449 21.9183 18.649 21.9498 18.5992C22.0207 18.4872 22.0146 11.8745 21.9436 11.8834C21.9156 11.8869 21.7366 11.9693 21.546 12.0665ZM13.4498 19.8282C13.1962 19.942 12.9426 20.0559 12.6892 20.17C11.9237 20.5156 12.0737 20.5271 11.1631 20.054C10.5566 19.7389 10.2952 19.6417 10.1817 19.6889C10.0966 19.7243 9.36406 20.0682 8.55371 20.4532C7.74342 20.8381 7.05234 21.1531 7.01796 21.1531C6.67799 21.1531 7.24318 21.5055 9.42417 22.6536L11.9819 24L13.0581 23.4455C13.65 23.1406 14.8439 22.5299 15.7112 22.0885C16.5784 21.6469 17.2773 21.2743 17.2642 21.2602C17.251 21.2462 16.5244 20.8568 15.6493 20.3948L14.0583 19.555L13.4498 19.8282Z'
              fill='currentColor'
            />
          </svg>
        </a>
      </li>
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
    },
    {
      id: "coinmarketcap",
      href: COINMARKETCAP
    }
  ]

  return <SocialList items={socialLinks} />
}
