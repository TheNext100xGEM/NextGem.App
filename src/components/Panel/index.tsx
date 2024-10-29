import "./_panel.scss"
import { Button, Corner, Grid, Item, Modal } from "@components/ui"
import {
  SOUND_BUTTON_CLICK,
  SOUND_BUTTON_HOVER,
  VOLUME_BUTTON_CLICK,
  VOLUME_BUTTON_HOVER
} from "@constants/index"
import { Icon } from "@iconify/react"
import { truncateWalletAddress } from "@utils/wallet"
import { useWeb3React } from "@web3-react/core"
import { useState, useMemo } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"

import {
  ConnectionType,
  getConnection,
  tryActivateConnector
} from "../../libs/connections"
import { APP_API_URL } from "../../libs/constants"

function Panel() {
  const { account, provider } = useWeb3React()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [web3Token, setWeb3Token] = useState<string | null>(Cookies.get("web3AuthToken") || null)

  // Open and close modal
  const openModal = (e: any) => {
    e.stopPropagation()
    setIsOpen(true)
  }
  const closeModal = () => setIsOpen(false)

  const handleGoogleLogin = () => {
    // Replace with your backend route that initiates Google OAuth
    window.location.href = `${APP_API_URL}/auth/google`
  }

  // Handle wallet login, sign a message, and send to backend
  const handleLoginWithWallet = async () => {
    if (!provider || !account) return

    try {
      const signer = provider.getSigner()
      const message = "Please sign this message to log in to Next Gem."
      const signature = await signer.signMessage(message)

      // Send the wallet address and signature to the API
      const response = await axios.post(`${APP_API_URL}/auth/wallet`, {
        address: account,
        signature
      })

      // If successful, store the received token in cookies and update state
      if (response.data.token) {
        Cookies.set("web3AuthToken", response.data.token, { expires: 1 })
        setWeb3Token(response.data.token)
        toast.success("Login successful!")  // Show success toast
        closeModal()
      } else {
        toast.error("Login failed. Please try again.")
      }
    } catch (error) {
      console.error("Error during login with wallet:", error)
      toast.error("Error signing the message. Please try again.")
    }
  }

  // Memoize the ButtonPanel to avoid unnecessary re-renders
  const ButtonPanel = useMemo(() => {
    if (account && web3Token) {
      return (
        <Button icon="logos:metamask-icon" onClick={handleLoginWithWallet}>
          {truncateWalletAddress(account)}
        </Button>
      )
    } else {
      return (
        <Button icon="carbon:wallet" onClick={openModal}>
          Login
        </Button>
      )
    }
  }, [account, web3Token])

  type PropsWallet = {
    name: string
    icon: string
    desc: string
    connectionType: ConnectionType
    disabled?: boolean
  }

  const listWallet: PropsWallet[] = [
    {
      name: "Metamask",
      icon: "arcticons:metamask",
      desc: "Connect to your Metamask",
      connectionType: ConnectionType.INJECTED
    },
    {
      name: "WalletConnect",
      icon: "simple-icons:walletconnect",
      desc: "Connect to your WalletConnect",
      connectionType: ConnectionType.WALLET_CONNECT
    },
    {
      name: "Binance Wallet",
      icon: "simple-icons:binance",
      desc: "Connect with Binance Chain Wallet",
      connectionType: ConnectionType.INJECTED,
      disabled: true
    },
    {
      name: "Coinbase Wallet",
      icon: "tabler:brand-coinbase",
      desc: "Connect with Coinbase",
      connectionType: ConnectionType.COINBASE_WALLET
    }
  ]

  // Memoize ModalConnect to avoid re-renders when modalIsOpen state doesn’t change
  const ModalConnect = useMemo(() => {
    const Wallet = ({
      name,
      icon,
      desc,
      connectionType,
      disabled
    }: PropsWallet) => {
      const [soundClick] = useSound(SOUND_BUTTON_CLICK, {
        volume: VOLUME_BUTTON_CLICK
      })
      const [soundHover] = useSound(SOUND_BUTTON_HOVER, {
        volume: VOLUME_BUTTON_HOVER
      })

      const handleConnect = async () => {
        soundClick()

        const activation = await tryActivateConnector(
          getConnection(connectionType).connector
        )

        if (!activation) {
          return
        }

        // After successful activation, trigger login flow
        handleLoginWithWallet()
      }

      return (
        <div
          className="wallet"
          onClick={!disabled ? () => handleConnect() : undefined}
          onMouseEnter={!disabled ? () => soundHover() : undefined}
          data-disabled={disabled}
        >
          <Icon icon={icon} />
          <h6>{name}</h6>
          <p>{desc}</p>
          <Corner />
          <Corner color="primary" className="corner-hover" />
        </div>
      )
    }

    return (
      <Modal
        title="Login to Next Gem"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        {/* Social Login Buttons */}
        <Grid className="grid-social">
          <Button icon="flat-color-icons:google" onClick={handleGoogleLogin} />
          <Button icon="logos:telegram" onClick={openModal} />
          <Button icon="logos:twitter" onClick={openModal} />
        </Grid>
    
        <div className="separator-container">
          <hr className="separator-line" />
          <span className="separator-text">or</span>
          <hr className="separator-line" />
        </div>
    
        <Grid className="grid-wallet">
          {listWallet.map((wallet, id) => (
            <Item key={id}>
              <Wallet {...wallet} />
            </Item>
          ))}
        </Grid>
      </Modal>
    )
  }, [modalIsOpen])

  return (
    <>
      {ButtonPanel}
      {ModalConnect}
      <ToastContainer />  {/* Toast container for displaying toasts */}
    </>
  )
}

export default Panel
