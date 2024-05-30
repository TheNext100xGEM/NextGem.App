import "./_staking.scss"
import logoTokenSrc from "@assets/img/logo-token-next-gem.webp"
import Scene from "@components/3D"
import { Button, BuyNextGemButton, Corner } from "@components/ui"
import { BigNumber } from "@ethersproject/bignumber"
import { ROLE } from "@constants/index"
import {
  CHAT_NAME,
  COINMARKETCAP,
  SITE_NAME,
  SOUND_BUTTON_CLICK,
  SOUND_BUTTON_HOVER,
  TOKEN_NAME,
  VOLUME_BUTTON_CLICK,
  VOLUME_BUTTON_HOVER
} from "@constants/index"
import { useGSAP } from "@gsap/react"
import { Icon } from "@iconify/react"
import { PropsOffer } from "@models/Offers"
import { formatter, maxOfThree } from "@utils/number"
import classNames from "classnames"
import gsap from "gsap"
import { ReactNode, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import toast from "react-hot-toast"
import LazyLoad from "react-lazyload"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"
import {
  usePremiumContract,
  useTokenContract
} from "../../../hooks/useContract"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import Web3 from "web3"
import { INFURA_URL, PREMIUM_ADDRESS } from "../../../libs/constants"
import useTokenInfo from "@hooks/useContractInfo"
import getGemaiPriceUsd from "@utils/coingeko"
import { formatLocalTimestamp } from "@utils/date"

type PropsCard = {
  children: ReactNode
  className?: string
  reverse?: boolean
}
const Card = ({ children, className, reverse = false }: PropsCard) => {
  return (
    <div className={classNames("card", className)}>
      {children}
      <Corner reverse={reverse} />
    </div>
  )
}

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

function PremiumPage() {
  const [prolonged, setProlonged] = useState(false)
  const handleProlonged = () => setProlonged(!prolonged)
  const tokenContract = useTokenContract()
  const stakingContract = usePremiumContract()
  const { totalSupply } = useTokenInfo()
  const [premium, setPremium] = useState(false)
  const [burnAmount, setBurnAmount] = useState(0)
  const [usdPrice, setUsdPrice] = useState(0)
  const [usd, setUsd] = useState(0)
  const { account } = useWeb3React()
  const [premiumText, setPremiumText] = useState("Get premium access")
  const [expirationDate, setExpirationDate] = useState('')
  const E18 = BigNumber.from(10).pow(18);

  const web3 = new Web3(INFURA_URL)

  useEffect(() => {
    ;(async () => {
      const price = await getGemaiPriceUsd()
      setUsd(price)
      if (account) {
        const isSubscribe = await stakingContract.methods
          .checkManyRoles(account, ROLE)
          .call()
        if (isSubscribe) {
          const role1: BigInt = await stakingContract.methods
          .getRoleExpiration(account, ROLE[0])
          .call()
          console.log(role1)
          const role2: BigInt  = await stakingContract.methods
          .getRoleExpiration(account, ROLE[1])
          .call()
          const role3: BigInt  = await stakingContract.methods
          .getRoleExpiration(account, ROLE[2])
          .call()
          console.log(role1, role2, role3)
          const data = formatLocalTimestamp(Number(maxOfThree(role1, role2, role3)))
          setExpirationDate(data)
          setPremium(true)
          setProlonged(false)
        }
      }
      if (totalSupply) {
        const price = await getGemaiPriceUsd()
        setBurnAmount(
          850000000 -
            Number(
              ethers
                .formatUnits((totalSupply as string).toString(), 18)
                .toString()
            )
        )
        setUsdPrice(
          price *
            (850000000 -
              Number(
                ethers
                  .formatUnits((totalSupply as string).toString(), 18)
                  .toString()
              ))
        )
      }
    })()
  }, [account, totalSupply])

  const handlePremium = (tokenAmt: Number, activeOffer: any) => {
    ;(async () => {
      if (account) {
        const currentGasPrice = await web3.eth.getGasPrice()
        const gasPrice = web3.utils.fromWei(currentGasPrice, "gwei")
        const gasPriceWei = web3.utils.toWei(gasPrice, "gwei")
        const gasLimit = "130000"
        setPremiumText("Approving")
        try {
          const allowance = await tokenContract.methods
            .allowance(account, PREMIUM_ADDRESS)
            .call()
          if (
              BigNumber.from(Number(tokenAmt) * 1000000000)
                .div(1000000000)
                .gt(BigNumber.from(allowance).div(E18))
          ) {
            await tokenContract.methods
              .approve(PREMIUM_ADDRESS, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
              .send({ from: account, gas: gasLimit, gasPrice: gasPriceWei })
          }
          setPremiumText("Buying")
          await stakingContract.methods
            .subscribe(ROLE[activeOffer])
            .send({ from: account, gas: gasLimit, gasPrice: gasPriceWei })
          setPremiumText("Transaction Completed")
          toast.success(`You have unlocked access to our services.`)
          setPremium(true)
          setProlonged(false)
        } catch (e) {
          setPremiumText("Get premium access")
        }
      } else {
        toast.success(`Please connect your wallet.`)
      }
    })()
  }

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

  const statusAccess = premium ? "success" : "warning"
  const iconAccess = premium ? "carbon:unlocked" : "carbon:locked"
  const labelAccess = premium ? "Unlocked" : "Locked"

  const Total = () => {
    const total = formatter(burnAmount)

    const TotalInput = () => {
      return (
        <div className='total-input'>
          <LogoToken />
          <div className='total-input-content'>
            <strong>{total}</strong>
            <small>{usdPrice.toFixed(0)}$</small>
          </div>
          <Corner reverse />
        </div>
      )
    }

    return (
      <Card className='total' reverse>
        <div className='total-heading'>
          <div className='total-heading-left'>
            <div className='sub'>Premium</div>
            <h4>Total burn:</h4>
          </div>
          <BuyNextGemButton />
        </div>
        <TotalInput />
        <div className='total-bottom'>
          <div className='sub'>
            {/* <Icon icon='carbon:user-multiple' /> {holders} Holders */}
          </div>
          <a
            href={COINMARKETCAP}
            target='_blank'
            rel='noopener noreferrer'
            className='sub'
          >
            <Icon icon='simple-icons:coinmarketcap' /> CoinMarketCap
          </a>
        </div>
      </Card>
    )
  }

  const Separator = () => {
    return (
      <div className='staking-separator' data-status={statusAccess}>
        <div className='cube'>
          <Icon icon={iconAccess} />
        </div>
      </div>
    )
  }

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
          <Corner color='primary' />
        </div>
        <Corner />
      </div>
    )
  }

  const Unlock = () => {
    const [offerActive, setOfferActive] = useState(1)
    const info = offers[offerActive]

    const Locked = () => {
      return (
        <>
          <div className='p'>
            <p>
              Select the subscription period for NextGem services. Please note
              that the required token amount may vary, and costs could increase
              accordingly.
            </p>
          </div>
          <ul className='unlock-list'>
            {offers.map((item, id) => (
              <li
                key={id}
                onClick={() => setOfferActive(id)}
                className={id === offerActive ? "active" : ""}
              >
                <OfferItem {...item} />
              </li>
            ))}
          </ul>
          <div className='unlock-order'>
            <ul data-status={info.status}>
              <li className='sub'>
                <small>Order:</small>
                <span>
                  <strong>
                    {info.duration} {info.durationLabel}
                  </strong>{" "}
                  - {formatter(info.token)}
                </span>
              </li>
              <li className='sub'>
                <small>Total Price:</small>
                <span>~ {(info.token * usd).toFixed(0)} $</span>
              </li>
            </ul>
            <Corner />
          </div>
          <Button
            status='success'
            icon='carbon:unlocked'
            onClick={() => handlePremium(info.token, offerActive)}
          >
            {premiumText}
          </Button>
        </>
      )
    }

    const Unlocked = () => {
      return (
        <>
          <div className='p'>
            <p>Your premium access to {CHAT_NAME} is available until:</p>
          </div>
          <h5>{expirationDate}</h5>
          <div className='unlock-button'>
            <Button
              icon='carbon:time'
              color='tertiary'
              onClick={handleProlonged}
            >
              Prolong my access
            </Button>
            <Button href='/gem-ai' icon='carbon:text-mining-applier'>
              Access to {CHAT_NAME}
            </Button>
          </div>
        </>
      )
    }

    return (
      <Card className='unlock'>
        <div className='unlock-title'>
          <Button status={statusAccess}>{labelAccess}</Button>
          <h5>
            {premium ? "Your Premium access" : "Unlock your Premium access"}
          </h5>
        </div>
        {premium && <Unlocked />}
        {(!premium || prolonged) && <Locked />}
      </Card>
    )
  }

  useGSAP(() => {
    const delay = 0
    gsap.from(".staking-left", { opacity: 0, delay: delay })
    gsap.from(".staking-right, .staking-bottom", {
      opacity: 0,
      y: 75,
      delay: delay
    })
    gsap.from(".staking-right .unlock", { y: 50, delay: delay })

    gsap.fromTo(
      ".staking-left > div",
      { y: "-5%" },
      {
        y: "5%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          endTrigger: ".staking-top",
          end: "bottom top",
          scrub: true
        }
      }
    )
  })

  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Premium</title>
      </Helmet>
      <div className='staking'>
        <div className='wrapper'>
          <div className='staking-top'>
            <div className='staking-left'>
              <Scene id='D0UaKd494PA-r6uE' />
            </div>
            <div className='staking-right'>
              <Total />
              <Separator />
              <Unlock />
              <div className='more'>
                <div className='more-arrow'>
                  <div className='more-arrow-shape'></div>
                </div>
                <a href='#bottom' className='sub'>
                  More infos
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id='bottom' className='staking-bottom'>
          <div className='staking-bottom-overflow'>
            <div className='wrapper'>
              <div className='staking-bottom-content'>
                <h3>Understanding the NextGem Service and Premium Benefits</h3>
                <div className='intro'>
                  <p>
                    The NextGem service incorporates a burn mechanism to reduce
                    the total supply of GEMAI tokens, achieved by permanently
                    removing a portion of tokens from circulation. This scarcity
                    can potentially increase the value of remaining tokens. Our
                    automated process ensures regular, consistent impact on the
                    token's supply and value.
                  </p>
                </div>
                <div className='p'>
                  <p>
                    Subscribing to the Premium NextGem service offers
                    significant advantages. You can choose from three
                    subscription periods: 1 month, 6 months, or one year, with
                    discounts applied based on duration. This is facilitated by
                    burning a specific amount of GEMAI through a transaction on
                    the Ethereum chain, recorded on our deployed smart contract.
                  </p>
                  <div>
                    Here are some key features of our Premium service:
                    <ul>
                      <li>
                        Access to GEMAI for querying specific data from our
                        database dataset.
                      </li>
                      <li>
                        Sentiment Analysis based on community member engagement
                        and trustability scores.
                      </li>
                      <li>
                        Detailed project insights, including direct pros and
                        cons assessed by various AIs, with summarized
                        information accessible on the web application.
                      </li>
                      <li>
                        Capability to request specialized analysis of any
                        project by providing its website link, utilizing our LLM
                        AI system for real-time evaluation and rating.
                      </li>
                      <li>
                        Customizable alerts based on pre-set criteria in our
                        application, enabling users to receive timely
                        information about new launches that meet their
                        conditions via socials, emails, etc.
                      </li>
                      <li>
                        Exclusive real-time news and analysis updates from our
                        system, delivered directly without delay.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='staking-bottom-bg'>
              <LazyLoad offset={100} height={100} once>
                <Scene id='ANnAzezL-kW4IEPO' />
              </LazyLoad>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PremiumPage
