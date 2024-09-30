import "./_panel.scss"
import { Button, Corner, Grid, Item, Modal, Input } from "@components/ui"
import {
  SOUND_BUTTON_CLICK,
  SOUND_BUTTON_HOVER,
  VOLUME_BUTTON_CLICK,
  VOLUME_BUTTON_HOVER
} from "@constants/index"
import { Icon } from "@iconify/react"
import { truncateWalletAddress } from "@utils/wallet"
import { useWeb3React } from "@web3-react/core"
import { useState, useCallback, useMemo } from "react"
import Cookies from "js-cookie"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"

import {
  ConnectionType,
  getConnection,
  tryActivateConnector
} from "../../libs/connections"

function Panel() {
  const { account } = useWeb3React()

  // Modal state separated from other states
  const [modalIsOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogged = () => {}
  const openModal = (e: any) => {
    e.stopPropagation()
    setIsOpen(true)
  }
  const closeModal = () => setIsOpen(false)
  const storedToken = Cookies.get("web3TokenAuth")

  // Memoize ButtonPanel to avoid unnecessary re-renders
  const ButtonPanel = useMemo(() => {
    if (account && storedToken) {
      return (
        <Button icon="logos:metamask-icon" onClick={handleLogged}>
          {truncateWalletAddress(account)}
        </Button>
      )
    } else {
      return (
        <Button icon="carbon:wallet" onClick={openModal}>
          Connect your wallet
        </Button>
      )
    }
  }, [account, storedToken])

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

        closeModal()
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
        title="Connect your wallet"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className="email-password-form">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e)}
            type="email"
            className="input-email"
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e)}
            type="password"
            className="input-password"
          />
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
  }, [modalIsOpen, email, password])

  return (
    <>
      {ButtonPanel}
      {ModalConnect}
    </>
  )
}

export default Panel
