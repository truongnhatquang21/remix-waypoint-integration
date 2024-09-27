import { HtmlHTMLAttributes, useEffect, useState } from 'react';
import Avatar from '../avatar';
import { IoIosLogOut } from 'react-icons/io';
import { cn } from '~/utils/styles';
import { useWallet } from '~/context/wallet';
import { ethers } from 'ethers';

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  caption: string;
};

const Account = (props: Props) => {
  const { disconnectWallet, getBalance } = useWallet();
  const [balance, setBalance] = useState('0');
  useEffect(() => {
    getBalance().then((balance) => {
      if (balance) {
        return setBalance(ethers.utils.formatEther(balance));
      }
    });
  }, [getBalance]);

  return (
    <div
      {...props}
      className={cn(
        'flex items-center gap-2 size-full rounded-xl w-fit p-2 border  bg-slate-200',
        props.className
      )}
    >
      <Avatar />
      <div className='flex flex-col flex-1 gap-1'>
        <span className='text-lg font-bold'>Ronin</span>
        <span className='text-sm'>{props.caption}</span>
        {balance && (
          <span className='text-xs font-light'>Balance: {balance} RON</span>
        )}
      </div>
      <IoIosLogOut
        className='size-8 p-1 rounded-full border text-red-500  bg-red-100 font-bold'
        onClick={disconnectWallet}
      />
    </div>
  );
};

export default Account;
