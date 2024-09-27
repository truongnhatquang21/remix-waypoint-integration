import { HtmlHTMLAttributes } from 'react';
import Avatar from '../avatar';
import { IoIosLogOut } from 'react-icons/io';
import { cn } from '~/utils/styles';
import { useWallet } from '~/context/wallet';

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  caption: string;
};

const Account = (props: Props) => {
  const { disconnectWallet } = useWallet();
  return (
    <div
      {...props}
      className={cn(
        'flex items-center gap-2 size-full rounded-xl w-fit p-2 border  bg-slate-200',
        props.className
      )}
    >
      <Avatar />
      <div className='flex flex-col flex-1'>
        <span className='text-lg font-bold'>Ronin</span>
        <span className='text-sm'>{props.caption}</span>
      </div>
      <IoIosLogOut
        className='size-8 p-1 rounded-full border text-red-500  bg-red-100 font-bold'
        onClick={disconnectWallet}
      />
    </div>
  );
};

export default Account;
