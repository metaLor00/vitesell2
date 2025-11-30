import { cm } from '@helper/clsx';
import type React from 'react';

type SpinnerProps = {
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={cm(
        'w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin',
        className,
      )}
    />
  );
};

export default Spinner;
