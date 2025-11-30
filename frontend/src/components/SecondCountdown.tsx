import type React from 'react';
import { useEffect, useState } from 'react';

import { cn } from '../libs/utils';
import Icon from './icon/icon';

interface SecondCountdownProps {
  seconds?: number;
  text?: string;
  className?: string;
  classNameText?: string;
  classNameIcon?: string;
  handleSetFinishedCounter: (finishedCounter: boolean) => void;
  icon?: string;
}

const SecondCountdown: React.FC<SecondCountdownProps> = ({
  seconds = 12,
  text,
  icon,
  className,
  classNameText,
  classNameIcon,
  handleSetFinishedCounter,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const timeFormatter=(time:number)=>{
    const minuts=Math.floor(time/60);
    const seconds=time%60;
    return `${minuts}:${seconds<10?'0':''}${seconds}`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(interval);
          handleSetFinishedCounter(true);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return (): void => clearInterval(interval);
  }, [handleSetFinishedCounter]);

  return (
    <div className={cn('flex items-center justify-center text-sm', className)}>
      {icon && <Icon icon={icon} additionalClasses={cn('text-xs', classNameIcon)} />}
      <span className="w-8 text-center">{timeFormatter(timeLeft)}</span>
      {text && <span className={cn('text-xs', classNameText)}>{text}</span>}
    </div>
  );
};

export default SecondCountdown;
