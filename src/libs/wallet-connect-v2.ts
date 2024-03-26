import { initializeConnector } from "@web3-react/core"
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2"

import { Connection, ConnectionType, onConnectionError } from "./connections"
import { CHAIN_TO_URL_MAP } from "./constants"

const [mainnet, ...optionalChains] = Object.keys(CHAIN_TO_URL_MAP).map(Number)

export function buildWalletConnectConnector() {
  let walletConnectErrorHandler: (error: Error) => void | undefined

  function walletConnectError(error: Error) {
    onConnectionError(error)
    walletConnectErrorHandler?.(error)
  }

  const [webWalletConnectV2, web3WalletConnectHooks] =
    initializeConnector<WalletConnectV2>((actions) => {
      return new WalletConnectV2({
        actions,
        options: {
          // projectId: WALLET_CONNECT_PROJECT_ID,
          projectId: "2b9b340fa18e8b5d57fb3ed8e9821bd3",
          chains: [mainnet],
          optionalChains: [mainnet, ...optionalChains],
          showQrModal: true
        },
        onError: walletConnectError
      })
    })

  console.log("webWalletConnectV2", webWalletConnectV2)

  const walletConnectConnection: Connection = {
    connector: webWalletConnectV2,
    hooks: web3WalletConnectHooks,
    type: ConnectionType.WALLET_CONNECT
  }

  return walletConnectConnection
}
