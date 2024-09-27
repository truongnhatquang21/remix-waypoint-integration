import { HtmlHTMLAttributes } from 'react';
import { cn } from '~/utils/styles';

const Separate = (props: HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn('border-t-2 p-2 min-w-[400px]', props.className)}
    />
  );
};

export default Separate;
