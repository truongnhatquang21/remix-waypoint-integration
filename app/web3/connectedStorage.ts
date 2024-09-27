

import { getStorage, removeStorage, setStorage } from '../utils/storage'
export enum Providers {
  RONIN_WALLET = 1,
  RONIN_WAYPOINT = 2,
}

export enum ConnectorType {
  EXTENSION = 'extension',
  MOBILE = 'mobile',
  IN_APP = 'in_app',
  RONIN_WAYPOINT = 'ronin_waypoint',
}
type ConnectedWalletStorage = {
  connectorType: ConnectorType
}
const CONNECTED_WALLET_KEY = 'connected-wallet'

export const setConnectedStorage = ({
  connectorType,
}: Partial<ConnectedWalletStorage>) => {
  const currentValue = getStorage(CONNECTED_WALLET_KEY)
  if (!currentValue) {
    setStorage(
      CONNECTED_WALLET_KEY,
      JSON.stringify({
        connectorType,
      })
    )
    return
  }

  const newValue = {
    ...JSON.parse(currentValue),
    ...(connectorType ? { connectorType } : {}),
  }

  setStorage(CONNECTED_WALLET_KEY, JSON.stringify(newValue))
}

export const getConnectedStorage = () => {
  const connectedWallet = getStorage(CONNECTED_WALLET_KEY)
  if (!connectedWallet) return null
  return JSON.parse(connectedWallet) as ConnectedWalletStorage
}

export const clearConnectedStorage = () => {
  removeStorage(CONNECTED_WALLET_KEY)
}
