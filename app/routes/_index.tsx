import type { MetaFunction } from '@remix-run/node';
import { WalletContextProvider } from '~/context/wallet';
import Home from '~/view';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <WalletContextProvider>
      <Home />
    </WalletContextProvider>
  );
}
