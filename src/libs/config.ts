import { http, createConfig } from "wagmi"
import { mainnet, polygon } from "wagmi/chains"
import { coinbaseWallet, walletConnect } from "wagmi/connectors"

import { WALLET_CONNECT_PROJECT_ID } from "./constants"

const projectId = WALLET_CONNECT_PROJECT_ID

export const config = createConfig({
  chains: [mainnet, polygon],
  connectors: [
    coinbaseWallet({
      appName: "The Next Gem — AI"
    }),
    walletConnect({ projectId })
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http()
  }
})
