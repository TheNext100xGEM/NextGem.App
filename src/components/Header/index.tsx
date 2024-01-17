import "./_header.scss"
import Nav from "@components/Nav"
import Panel from "@components/Panel"
import { SocialListNext } from "@components/Socials"
import {
  Button,
  BuyNextGemButton,
  OpenAppButton,
  Logotype
} from "@components/ui"
import {
  CHAT_NAME,
  SOUND_BUTTON_CLICK,
  VOLUME_BUTTON_CLICK
} from "@constants/index"
import { useAppContext } from "@context/AppContext"
import { NavItem } from "@models/Nav"
import classNames from "classnames"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"
import { useWeb3React } from "@web3-react/core"

type PropsNavLink = {
  to: string
  title: string
}

const NavLink = ({ to, title }: PropsNavLink) => {
  const [soundClick] = useSound("/sounds/click-button.mp3")
  const location = useLocation()

  return (
    <Link
      to={to}
      onClick={soundClick}
      className={location.pathname === to ? "active" : ""}
    >
      {title}
    </Link>
  )
}

const navLanding: NavItem[] = [
  { component: <NavLink to='pitchdeck.pdf' title='PitchDeck' /> },
  { component: <NavLink to='whitepaper.pdf' title='Whitepaper' /> },
  { component: <NavLink to='mailto:info@thenextgem.ai' title='Contact' /> },
  { component: <BuyNextGemButton /> },
  { component: <OpenAppButton /> }
]

const navApp: NavItem[] = [
  { component: <NavLink to='/' title='Gems' /> },
  { component: <NavLink to='/staking' title='Staking' /> },
  { component: <NavLink to='/gem-ai' title={CHAT_NAME} /> },
  { component: <Panel /> },
  {
    component: (
      <Button icon='carbon:settings' minus color='secondary' title='Settings' />
    )
  },
  {
    component: (
      <Button
        href='/infos'
        icon='carbon:close'
        minus
        color='secondary'
        title='Close'
      />
    )
  }
]

function Header() {
  const [navResponsive, setNavResponsive] = useState(false)
  const [soundClick] = useSound(SOUND_BUTTON_CLICK, {
    volume: VOLUME_BUTTON_CLICK
  })
  const { isInApp } = useAppContext()
  const headerClass = classNames("header", { inApp: isInApp })
  const navRef = useRef<HTMLDivElement>(null)

  const closeNavResponsive = useCallback(
    () => navResponsive && setNavResponsive(false),
    [navResponsive]
  )

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        navResponsive &&
        navRef.current &&
        !navRef.current.contains(e.target as HTMLElement)
      ) {
        closeNavResponsive()
      }
    },
    [navResponsive, closeNavResponsive]
  )

  useEffect(() => {
    const handleOutsideClick: EventListener = (e: Event) =>
      handleClickOutside(e as unknown as MouseEvent)
    document.addEventListener("click", handleOutsideClick)

    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [handleClickOutside, navResponsive, closeNavResponsive])

  return (
    <header className={headerClass}>
      <Link to='/' className='header-logo' onClick={soundClick}>
        <Logotype />
      </Link>
      <div className='header-wrapper'>
        <div className='header-wrapper-content header-landing'>
          <div className='header-left'>
            <SocialListNext />
          </div>
          <div className='header-right'>
            <Nav items={navLanding} />
          </div>
        </div>
        <div ref={navRef} className='header-wrapper-content header-app'>
          <div className='header-left'>
            <BuyNextGemButton />
          </div>
          <div
            className={classNames("header-right", { opened: navResponsive })}
            onClick={closeNavResponsive}
          >
            <Nav items={navApp} />
          </div>
          <Button
            icon='carbon:menu'
            minus
            title='Navigation'
            className='btn-nav'
            onClick={() => setNavResponsive(true)}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
