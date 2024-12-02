import  { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import AccountSidebar from "@components/Sidebar";
import  './_subscription.scss';
import { Button } from '@components/ui/Button';
import logoTokenSrc from "@assets/img/logo-token-next-gem.webp"
import { SOUND_BUTTON_CLICK, SOUND_BUTTON_HOVER, TOKEN_NAME, VOLUME_BUTTON_CLICK, VOLUME_BUTTON_HOVER } from '@constants/index';
import { PropsOffer } from '@models/Offers';
import { Corner } from '@components/ui';
import getGemaiPriceUsd from '@utils/coingeko';
import { formatter } from "@utils/number"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"



const offers: PropsOffer[] = [
  {
    duration: 1,
    durationLabel: "month",
    token: 15000,
    price: 76
  },
  {
    duration: 6,
    durationLabel: "months",
    token: 75000,
    price: 380,
    percent: 17,
    status: "info"
  },
  {
    duration: 1,
    durationLabel: "year",
    token: 120000,
    price: 610,
    percent: 34,
    status: "custom"
  }
]


const LogoToken = () => {
  return (
    <img
      src={logoTokenSrc}
      alt={TOKEN_NAME}
      width='346'
      height='255'
      loading='lazy'
    />
  )
}

 


function SubscriptionPage() {
  const [activeTab, _setActiveTab] = useState<'plan' | 'history'>('plan');
  const [offerActive, _setOfferActive] = useState(1)
  const [usd, setUsd] = useState(0)

  useEffect(() => {
    (async () => {
      const price = await getGemaiPriceUsd()
      setUsd(price)
    })()
  }, [])

  const OfferItem = ({
    duration,
    durationLabel,
    token,
    percent,
    status
  }: PropsOffer) => {
    const [soundClick] = useSound(SOUND_BUTTON_CLICK, {
      volume: VOLUME_BUTTON_CLICK
    })
    const [soundHover] = useSound(SOUND_BUTTON_HOVER, {
      volume: VOLUME_BUTTON_HOVER
    })
  
    return (
      <div className='offer' onMouseEnter={soundHover} onClick={soundClick}>
        <div className='offer-content' data-status={status}>
          {percent && <div className='offer-percent'>-{percent}%</div>}
          <div className='offer-duration'>
            <strong>{duration}</strong> <span>{durationLabel}</span>
          </div>
          <div className='offer-img'>
            <LogoToken />
          </div>
          <div className='offer-token'>{formatter(token)} GEMAI</div>
          <div className='sub'>~ {(token * usd).toFixed(0)} $</div>
        </div>
        <div className='hovered'>
          <Corner color='primary'/>
        </div>
        <Corner/>
      </div>
    )
  }

  return (
    <div className="subscription-page">
      <Helmet>
        <title>My Subscription | NextGem AI</title>
      </Helmet>
      <AccountSidebar />
      <main className="subscription-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'plan' ? 'active' : ''}}
            onClick={() => setActiveTab('plan')`}
          >
            SUBSCRIPTION PLAN
          </button>
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}}
            onClick={() => setActiveTab('history')`}
          >
            SUBSCRIPTION HISTORY
          </button>
        </div>

        {activeTab === 'plan' && (
          <>
            <div className="plan-details">
              <h2>Current Plan Details :</h2>
              <p>
                Current plan gives you access to all our premium feature for 6 month in which you can query specific data from our AI datasets, get sentimental analysis based on community, detailed project insights, custom analysis, real-time news and alerts.
              </p>
              <p>
                Please note that the<br />
                required token amount may vary, and costs could increase accordingly.
              </p>
            </div>

            {/* <div className="subscription-plans"> */}
            <ul className='unlock-list'>
            {offers.map((item, id) => (
              <li
                key={id}
                className={id === offerActive ? "active" : ""}
              >
                <OfferItem {...item} />
              </li>
              ))}
            </ul>
            {/* </div> */}

            <Button className="upgrade-button">
              UPGRADE/RENEW
            </Button>
          </>
        )}

        {activeTab === 'history' && (
          <div className="subscription-history">
            {/* Subscription history content */}
          </div>
        )}
      </main>
    </div>
  );
}

export default SubscriptionPage