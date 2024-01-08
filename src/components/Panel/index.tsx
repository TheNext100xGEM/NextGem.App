import './_panel.scss'
import { Button, Corner, Grid, Item, Modal } from '@components/ui'
import { SOUND_BUTTON_CLICK, SOUND_BUTTON_HOVER, VOLUME_BUTTON_CLICK, VOLUME_BUTTON_HOVER } from '@constants/index'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useEthers } from '@usedapp/core'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from 'use-sound'

function Panel() {
  const {account, activateBrowserWallet, deactivate} = useEthers()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [logged, setLogged] = useState(false) 

  const handleLogged = () => setLogged(!logged)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  
  const ButtonPanel = () => {
    if (account) {
      return (
        <Button icon="logos:metamask-icon" onClick={deactivate}>{`${account.slice(0, 6)}...${account.slice(account.length - 6, account.length)}`}</Button>
      )
    } else {
      return (
        <Button icon="carbon:wallet" onClick={activateBrowserWallet}>Connect your wallet</Button>
      )
    }
  }

  type PropsWallet = {
    name: string
    icon: string
    desc: string
  }

  const listWallet: PropsWallet[] = [
    {
      name: "Metamask",
      icon: "arcticons:metamask",
      desc: "Connect to your Metamask"
    },
    {
      name: "WalletConnect",
      icon: "simple-icons:walletconnect",
      desc: "Connect to your WalletConnect"
    },
    {
      name: "Binance Wallet",
      icon: "simple-icons:binance",
      desc: "Connect with Binance Chain Wallet"
    },
    {
      name: "Coinbase Wallet",
      icon: "tabler:brand-coinbase",
      desc: "Connect with Coinbase"
    }
  ]

  const ModalConnect = () => {
    const Wallet = ({ name, icon, desc }: PropsWallet) => {
      const [soundClick] = useSound(SOUND_BUTTON_CLICK, { volume: VOLUME_BUTTON_CLICK })
      const [soundHover] = useSound(SOUND_BUTTON_HOVER, { volume: VOLUME_BUTTON_HOVER })

      const handleConnect = () => {
        soundClick()
        closeModal()
        setLogged(true)
      }

      return (
        <div className="wallet" onClick={handleConnect} onMouseEnter={soundHover}>
          <Icon icon={icon} />
          <h6>{name}</h6>
          <p>{desc}</p>
          <Corner />
          <Corner color="primary" className="corner-hover"/>
        </div>
      )
    }

    return (
      <Modal title="Connect your wallet" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Grid className="grid-wallet">
          {listWallet.map((wallet, id) => 
            <Item key={id}>
              <Wallet {...wallet} />
            </Item>
          )}
        </Grid>
      </Modal>
    )
  }

  return (
    <>
      <ButtonPanel />
      {/* <ModalConnect /> */}
    </>
  )
}

export default Panel