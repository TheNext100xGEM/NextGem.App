import './_footer.scss'
import Nav from '@components/Nav'
import { SocialListNext } from '@components/Socials'
import { Logotype } from '@components/ui'
import { BUY_URL, TOKEN_NAME } from '@constants/index'
import { useAppContext } from '@context/AppContext'
import { NavItem } from '@models/Nav'
import { Link } from 'react-router-dom'

function Footer() {

  const { isInChat } = useAppContext()

  if (isInChat) {
    return
  }

  const navFooter: NavItem[] = [
    { component: <a href={BUY_URL} rel="noopener noreferrer" target="_blank">Buy {TOKEN_NAME}</a> },
    { component: <Link to="/default">CoinMarketCap</Link> },
    { component: <Link to="https://t.me/NextGemAI_Group">Telegram</Link> },
    { component: <Link to="https://t.me/NextGemAI_Group">Join presale</Link> },
  ]

  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer-left">
          <Logotype horizontal={true} />
          <p>© 2024. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <Nav items={navFooter} />
          <SocialListNext />
        </div>
      </div>
    </footer>
  )
}

export default Footer