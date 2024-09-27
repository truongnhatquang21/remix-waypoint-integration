import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  clearConnectedStorage,
  ConnectorType,
  getConnectedStorage,
  setConnectedStorage,
} from '~/web3/connectedStorage';
import { roninWaypointWalletProvider } from '~/web3/roninWaypoint';

type WalletContextValue = {
  web3Provider?: Web3Provider;
  connectedAddress?: string;
  connectedChainId: number;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  getBalance: () => Promise<ethers.BigNumber | undefined>;
};

const WalletContext = createContext<WalletContextValue>(
  {} as WalletContextValue
);

type WalletContextProviderProps = {
  children: React.ReactNode;
};
export const WalletContextProvider = ({
  children,
}: WalletContextProviderProps) => {
  const [connectedAddress, setConnectedAddress] = useState<string | undefined>(
    undefined
  );

  const [web3Provider, setWeb3Provider] = useState<Web3Provider | undefined>(
    undefined
  );

  const disconnectWallet = useCallback(async () => {
    await roninWaypointWalletProvider.disconnect();
    setConnectedAddress(undefined);
    setWeb3Provider(undefined);
    clearConnectedStorage();
  }, []);

  const connectWallet = useCallback(
    async (options?: { autoConnect?: boolean }) => {
      if (options?.autoConnect) {
        const accounts = await roninWaypointWalletProvider.request<string[]>({
          method: 'eth_accounts',
          params: [],
        });

        if (accounts.length > 0) {
          setWeb3Provider(
            new ethers.providers.Web3Provider(roninWaypointWalletProvider)
          );
          setConnectedAddress(accounts[0]);
        }
        return;
      }

      const result = await roninWaypointWalletProvider.connect();
      console.log(result);

      setWeb3Provider(
        new ethers.providers.Web3Provider(roninWaypointWalletProvider)
      );
      setConnectedAddress(result.address);
      setConnectedStorage({
        connectorType: ConnectorType.RONIN_WAYPOINT,
      });
    },
    []
  );

  const autoConnectWallet = useCallback(async () => {
    const connectedStorage = getConnectedStorage();
    if (connectedStorage?.connectorType === ConnectorType.RONIN_WAYPOINT) {
      await connectWallet({ autoConnect: true });
    }
  }, [connectWallet]);

  useEffect(() => {
    autoConnectWallet();
  }, [autoConnectWallet]);

  const getBalance = useCallback(async () => {
    if (web3Provider && connectedAddress) {
      return web3Provider.getBalance(connectedAddress);
    }
  }, [web3Provider, connectedAddress]);

  const value = useMemo<WalletContextValue>(() => {
    return {
      connectWallet,
      disconnectWallet,
      connectedAddress,
      web3Provider,
      connectedChainId: roninWaypointWalletProvider.chainId,
      getBalance,
    };
  }, [
    connectedAddress,
    web3Provider,
    connectWallet,
    disconnectWallet,
    getBalance,
  ]);

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => React.useContext(WalletContext);
