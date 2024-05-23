import "./_staking.scss"
import logoTokenSrc from "@assets/img/logo-token-next-gem.webp"
import Scene from "@components/3D"
import { Button, BuyNextGemButton, Corner, Input } from "@components/ui"
import { BigNumber } from "@ethersproject/bignumber"
import { ROLE, SITE_NAME, TOKEN_NAME } from "@constants/index"
import { useGSAP } from "@gsap/react"
import { Icon } from "@iconify/react"
import { formatter } from "@utils/number"
import classNames from "classnames"
import gsap from "gsap"
import { ReactNode, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import toast from "react-hot-toast"
import { ethers } from "ethers"
import LazyLoad from "react-lazyload"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"
import {
  usePremiumContract,
  useStakeContract,
  useTokenContract
} from "../../../hooks/useContract"
import { useWeb3React } from "@web3-react/core"
import Web3 from "web3"
import { INFURA_URL, STAKING_ADDRESS } from "../../../libs/constants"
import { useNavigate } from "react-router-dom"

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

function StakingPage() {
  const tokenContract = useTokenContract()
  const stakingContract = useStakeContract()
  const premiumContract = usePremiumContract()
  const [Staking, setStaking] = useState("")
  const [staked, setStaked] = useState("0")
  const { account } = useWeb3React()
  const [remainingBlock, setRemainingBlock] = useState(0)
  const [apy, setApy] = useState(0)
  const [amountAllocated, setAmmountAllocated] = useState(0)
  const [reward, setReward] = useState(0)
  const [StakingText, setStakingText] = useState("Stake Gem AI")
  const [maxPerWallet, setMaxPerWallet] = useState(0)
  const [isPremium, setIsPremium] = useState(false)
  const web3 = new Web3(INFURA_URL)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const eventId = await stakingContract.methods.currentEventId().call()
      console.log(eventId)
      if (account) {
        const isSubscribe: boolean = await premiumContract.methods
          .checkManyRoles(account, ROLE)
          .call()
        setIsPremium(isSubscribe)
        const rewardAmount: any = await stakingContract.methods
          .calculateReward(eventId, account)
          .call()
        setReward(
          Number(
            ethers
              .formatUnits((rewardAmount as string).toString(), 18)
              .toString()
          )
        )
      }
      const totalStaked: string = await stakingContract.methods
        .getTotalStaked(eventId)
        .call()
      setStaked(
        ethers.formatUnits((totalStaked as string).toString(), 18).toString()
      )

      const remainingBlocks: any = await stakingContract.methods
        .getRemainingBlocks(eventId)
        .call()
      setRemainingBlock(Number(remainingBlocks))
      const apyDeatils: any = await stakingContract.methods
        .calculateAPY(eventId)
        .call()
      setApy(Number(apyDeatils))
      const eventDetails: any = await stakingContract.methods
        .stakingEvents(eventId)
        .call()
      setAmmountAllocated(
        Number(
          ethers
            .formatUnits((eventDetails.totalGEMAI as string).toString(), 18)
            .toString()
        )
      )
      setMaxPerWallet(
        Number(
          ethers
            .formatUnits((eventDetails.maxPerWallet as string).toString(), 18)
            .toString()
        )
      )
    })()
  }, [account])

  const handleStaking = (tokenAmt: Number) => {
    ;(async () => {
      if (account) {
        if (Number(tokenAmt) > 0) {
          if (Number(tokenAmt) <= maxPerWallet) {
            const currentGasPrice = await web3.eth.getGasPrice()
            const gasPrice = web3.utils.fromWei(currentGasPrice, "gwei")
            const gasPriceWei = web3.utils.toWei(gasPrice, "gwei")
            const gasLimit = "170000"
            setStakingText("Approving")
            try {
              const allowance = await tokenContract.methods
                .allowance(account, STAKING_ADDRESS)
                .call()
              if (
                BigNumber.from(String(allowance)).lt(
                  BigNumber.from(String(tokenAmt))
                )
              ) {
                await tokenContract.methods
                  .approve(STAKING_ADDRESS, ethers.parseEther(String(tokenAmt)))
                  .send({ from: account, gas: gasLimit, gasPrice: gasPriceWei })
              }
              setStakingText("Staking Initaiated")
              const eventId = await stakingContract.methods
                .currentEventId()
                .call()
              await stakingContract.methods
                .stake(Number(eventId), ethers.parseEther(String(tokenAmt)))
                .send({ from: account, gas: gasLimit, gasPrice: gasPriceWei })
              setStakingText("Transaction Completed")
              setStaking("")
              toast.success(`Staking Completed`)
              setStakingText("Stake Gem AI")
            } catch (e) {
              setStakingText("Stake Gem AI")
            }
          } else {
            toast.success(`Please enter amount less than ${maxPerWallet}.`)
          }
        } else {
          toast.success(`Please enter valid amount.`)
        }
      } else {
        toast.success(`Please connect your wallet.`)
      }
    })()
  }

  const handleClaim = () => {
    ;(async () => {
      if (account) {
        const currentGasPrice = await web3.eth.getGasPrice()
        const gasPrice = web3.utils.fromWei(currentGasPrice, "gwei")
        const gasPriceWei = web3.utils.toWei(gasPrice, "gwei")
        const gasLimit = "170000"
        try {
          const eventId = await stakingContract.methods.currentEventId().call()
          await stakingContract.methods
            .claim(Number(eventId))
            .send({ from: account, gas: gasLimit, gasPrice: gasPriceWei })
          toast.success(`Claim Successfull`)
        } catch (e) {
          setStakingText("Claim")
        }
      } else {
        toast.success(`Please connect your wallet.`)
      }
    })()
  }

  const statusAccess = Staking ? "success" : "warning"
  const iconAccess = Staking ? "carbon:unlocked" : "carbon:locked"

  const Total = () => {
    const total = formatter(Number(staked))
    const block = formatter(Number(remainingBlock))
    const apyData = formatter(Number(apy))
    const amount = formatter(Number(amountAllocated))
    const rewardAmount = formatter(Number(reward))
    const TotalInput = () => {
      return (
        <div className='total-input'>
          <LogoToken />
          <div className='total-input-content'>
            <strong>{total}</strong>
          </div>
          <Corner reverse />
        </div>
      )
    }

    const APYInput = () => {
      return (
        <div className='total-input'>
          APY
          <div className='total-input-content'>
            <strong>{apyData} %</strong>
          </div>
          <Corner reverse />
        </div>
      )
    }
    const BlockRemainingInput = () => {
      return (
        <div style={{ marginTop: "1.2em" }} className='total-input'>
          Block Remaining
          <div className='total-input-content'>
            <strong>{block}</strong>
          </div>
          <Corner reverse />
        </div>
      )
    }

    const AmountAllocatedInput = () => {
      return (
        <div style={{ marginTop: "1.2em" }} className='total-input'>
          Amount Allocated
          <div className='total-input-content'>
            <strong>{amount}</strong>
          </div>
          <Corner reverse />
        </div>
      )
    }

    const RewardInput = () => {
      return (
        <div style={{ marginTop: "1.2em" }} className='total-input'>
          Reward Allocated
          <div className='total-input-content'>
            <strong>{rewardAmount}</strong>
          </div>
          <Corner reverse />
        </div>
      )
    }

    return (
      <Card className='total' reverse>
            <div className='total-heading'>
              <div className='total-heading-left'>
                <div className='sub'>Staking</div>
                <h5>Total Staked:</h5>
              </div>
              <BuyNextGemButton />
            </div>
            <TotalInput />
            <div>
              <div className='total-heading-left'>
                <h5 style={{ marginBottom: "20px" }}>Staking Event Details:</h5>
              </div>
              <APYInput />
              <BlockRemainingInput />
              <AmountAllocatedInput />
              {(reward > 0  && account) && <RewardInput />}
              {/* <TimeRemainingInput /> */}
              {!account && <h5 style={{marginTop:'20px'}}>Login to participate in staking.</h5>}
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

  const Unlock = () => {
    const Locked = () => {
      const [data, setData] = useState("")
      return (
        <>
         {remainingBlock >0 ? <> <Input
            sprite={
              <img
                src={logoTokenSrc}
                alt={TOKEN_NAME}
                width='30'
                height='30'
                loading='lazy'
              />
            }
            value={data}
            placeholder='Staking Amount'
            className='input-staking'
            onChange={(e) => setData(e)}
            type={"number"}
            key={"amount"}
          />
          Maxium Amount Per Wallet : {maxPerWallet}
          <Button
            status='success'
            icon='carbon:unlocked'
            onClick={() => handleStaking(Number(data))}
          >
            {StakingText}
          </Button></>: <><h5>No staking event available </h5></>}
          {remainingBlock === 0 && reward > 0 && (
            <Button
              status='success'
              icon='carbon:unlocked'
              onClick={() => handleClaim()}
            >
              {"Claim"}
            </Button>
          )}
        </>
      )
    }

    return (
      <Card className='unlock'>
        <div className='unlock-title'>
          <h5>{"Your Staking details:"}</h5>
        </div>
        {!isPremium && (<div className='unlock-title'>
        <Button status={statusAccess}>{'Locked'}</Button>
          <span>
            {"You need premium to use staking"}
          </span>
          </div>)}
        {!isPremium && (
          <Button onClick={() => navigate("/premium")} blank={true}>
            Subcribe to premium
          </Button>
        )}
        {isPremium && <Locked />}
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
        <title>{SITE_NAME} — Staking</title>
      </Helmet>
      <div className='staking'>
        <div className='wrapper'>
          <div className='staking-top'>
            <div className='staking-left'>
              <Scene id='D0UaKd494PA-r6uE' />
            </div>
            <div className='staking-right'>
              <Total />
              {account && (
                <>
                  <Separator />
                  <Unlock />{" "}
                </>
              )}
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
                <h3>Understanding the NextGem Service and Staking Benefits</h3>
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
                    Subscribing to the Staking NextGem service offers
                    significant advantages. You can choose from three
                    subscription periods: 1 month, 6 months, or one year, with
                    discounts applied based on duration. This is facilitated by
                    burning a specific amount of GEMAI through a transaction on
                    the Ethereum chain, recorded on our deployed smart contract.
                  </p>
                  <div>
                    Here are some key features of our Staking service:
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

export default StakingPage
