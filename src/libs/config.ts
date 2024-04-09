import { http, createConfig } from "wagmi"
import { mainnet, polygon } from "wagmi/chains"
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors"

import { WALLET_CONNECT_PROJECT_ID } from "./constants"

const projectId = WALLET_CONNECT_PROJECT_ID

export const config = createConfig({
  chains: [mainnet, polygon],
  connectors: [
    coinbaseWallet({
      appName: "The Next Gem — AI"
    }),
    walletConnect({ projectId }),
    injected({
      target() {
        return {
          id: "okxwallet",
          name: "OKX Wallet",
          provider: () => {
            if (typeof window !== "undefined") return

            const isOkxWallet = (ethereum) => {
              return !!ethereum?.isOkxWallet
            }

            if (isOkxWallet(window.ethereum)) {
              return window.ethereum
            }

            if (window.ethereum?.providers)
              return window.ethereum.providers.find(isOkxWallet) ?? null

            return window["okxwallet"] ?? null
          }
        }
      }
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http()
  }
})
