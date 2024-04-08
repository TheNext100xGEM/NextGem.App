import "./_panel.scss"
import { Button, Corner, Dropdown, Grid, Item, Modal } from "@components/ui"
import {
  SOUND_BUTTON_CLICK,
  SOUND_BUTTON_HOVER,
  VOLUME_BUTTON_CLICK,
  VOLUME_BUTTON_HOVER
} from "@constants/index"
import { Icon } from "@iconify/react"
import { truncateWalletAddress } from "@utils/wallet"
import { useState } from "react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"
import { Connector, useAccount, useConnect, useDisconnect,  } from "wagmi"

import {
  ConnectionType,
  getConnection,
  tryActivateConnector
} from "../../libs/connections"

function Panel() {
  const [modalIsOpen, setIsOpen] = useState(false)

  const handleLogged = () => {}
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const { address: account } = useAccount()
  const { connectors, connectAsync } = useConnect()
  const { disconnect } = useDisconnect()

  console.log(connectors)

  const ButtonPanel = () => {
    if (account) {
      return (
        <Dropdown
          opener={
            <Button icon='logos:metamask-icon' onClick={handleLogged}>
              {truncateWalletAddress(account)}
            </Button>
          }
        >
          <Button icon='carbon:wallet' onClick={() => disconnect()}>
            Disconnect your wallet
          </Button>
        </Dropdown>
      )
    } else {
      return (
        <Button icon='carbon:wallet' onClick={openModal}>
          Connect your wallet
        </Button>
      )
    }
  }

  type PropsWallet = {
    name: string
    icon: string
    desc: string
    connectionType: ConnectionType
    disabled?: boolean
    connector?: Connector
  }

  const listWallet: PropsWallet[] = [
    {
      name: "Metamask",
      icon: "arcticons:metamask",
      desc: "Connect to your Metamask",
      connectionType: ConnectionType.INJECTED,
      connector: connectors.find((c) => c.type.includes("injected"))
    },
    {
      name: "WalletConnect",
      icon: "simple-icons:walletconnect",
      desc: "Connect to your WalletConnect",
      connectionType: ConnectionType.WALLET_CONNECT,
      connector: connectors.find((c) => c.type.includes("walletConnect"))
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
      connectionType: ConnectionType.COINBASE_WALLET,
      connector: connectors.find((c) => c.type.includes("coinbase"))
    }
  ]

  const ModalConnect = () => {
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
          className='wallet'
          onClick={!disabled ? () => handleConnect() : undefined}
          onMouseEnter={!disabled ? () => soundHover() : undefined}
          data-disabled={disabled}
        >
          <Icon icon={icon} />
          <h6>{name}</h6>
          <p>{desc}</p>
          <Corner />
          <Corner color='primary' className='corner-hover' />
        </div>
      )
    }

    const WagmiWallet = ({
      name,
      icon,
      desc,
      disabled,
      connector
    }: PropsWallet) => {
      const [soundClick] = useSound(SOUND_BUTTON_CLICK, {
        volume: VOLUME_BUTTON_CLICK
      })
      const [soundHover] = useSound(SOUND_BUTTON_HOVER, {
        volume: VOLUME_BUTTON_HOVER
      })

      const handleConnect = async () => {
        if (!connector) return

        soundClick()

        const data = await connectAsync({ connector })
        const provider = await connector.getProvider()

        console.log(data, provider)

        console.log(connector.isAuthorized)

        closeModal()
      }

      return (
        <div
          className='wallet'
          onClick={!disabled ? () => handleConnect() : undefined}
          onMouseEnter={!disabled ? () => soundHover() : undefined}
          data-disabled={disabled}
        >
          <Icon icon={icon} />
          <h6>{name}</h6>
          <p>{desc}</p>
          <Corner />
          <Corner color='primary' className='corner-hover' />
        </div>
      )
    }

    return (
      <Modal
        title='Connect your wallet'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <Grid className='grid-wallet'>
          {listWallet.map((wallet, id) => (
            <Item key={id}>
              <Wallet {...wallet} />
            </Item>
          ))}

          {listWallet.map((wallet, id) => (
            <Item key={id}>
              <WagmiWallet {...wallet} />
            </Item>
          ))}
        </Grid>
      </Modal>
    )
  }

  return (
    <>
      <ButtonPanel />
      <ModalConnect />
    </>
  )
}

export default Panel
