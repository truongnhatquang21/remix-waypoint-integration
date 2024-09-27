import { ethers } from 'ethers';
import { useState } from 'react';
import Account from '~/component/account';
import Separate from '~/component/separate';
import { useWallet } from '~/context/wallet';
import { authorizeFn } from '~/web3/roninWaypoint';

const Home = () => {
  const { connectWallet, connectedAddress, web3Provider } = useWallet();
  const [, setRerender] = useState(false);
  const handleTransfer = async () => {
    if (!web3Provider) {
      return;
    }
    await web3Provider.send('eth_sendTransaction', [
      {
        from: connectedAddress,
        to: '0x3E4102C024B4e7008100B69B6F2d8a9709e7e504',
        value: ethers.utils.parseEther('0.1').toHexString(),
      },
    ]);
    setRerender((prev) => !prev);
  };

  const [token, setToken] = useState<string | null>(null);

  const handleAuthorize = async () => {
    const result = await authorizeFn();
    setToken(result.accessToken);
  };

  return (
    <div className='flex items-center justify-center w-full flex-col mt-20 gap-10'>
      <h1 className='text-4xl font-bold'>
        Welcome to Remix integrated with Ronin Waypoint!
      </h1>
      {connectedAddress ? (
        <Account caption={connectedAddress} />
      ) : (
        <button
          className='border p-2 bg-slate-200 round rounded-md cursor-pointer'
          onClick={connectWallet}
        >
          Connect Wallet with Ronin Waypoint
        </button>
      )}
      <Separate />
      {connectedAddress && (
        <div className='w-1/2 flex items-center flex-col gap-2'>
          <h1 className='text-xl font-bold'>
            Send transaction to Ronin Waypoint
          </h1>
          <button
            className='border p-2 bg-slate-200 round rounded-md cursor-pointer'
            onClick={handleTransfer}
          >
            Transfer 0.1 RON to{' '}
            {'0x3E4102C024B4e7008100B69B6F2d8a9709e7e504'.slice(0, 10)}...
          </button>
          <h1 className='text-xl font-bold'>
            Authentication with Ronin Waypoint
          </h1>
          <button
            className='border p-2 bg-slate-200 round rounded-md cursor-pointer'
            onClick={handleAuthorize}
          >
            Authorize with Ronin Waypoint
          </button>
          {token && (
            <div className='border p-2 bg-slate-200 round rounded-md w-full break-words'>
              {token}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
