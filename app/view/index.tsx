import { ethers } from 'ethers';
import { useMemo } from 'react';
import Account from '~/component/account';
import { useWallet } from '~/context/wallet';

const Home = () => {
  const { connectWallet, connectedAddress } = useWallet();

  return (
    <div className='flex items-center justify-center w-full flex-col mt-20 gap-20'>
      <h1 className='text-4xl font-bold'>
        Welcome to Remix integrated with Ronin WayPoint!
      </h1>
      {connectedAddress ? (
        <Account caption={connectedAddress} />
      ) : (
        <button
          className='border p-2 bg-slate-200 round rounded-md'
          onClick={connectWallet}
        >
          Connect Wallet with Ronin Waypoint
        </button>
      )}
    </div>
  );
};

export default Home;
