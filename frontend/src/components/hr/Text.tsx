import { cm } from '@helper/clsx';
import type React from 'react';
type TextProps = {
  title?: string;
  icon?: string;
  className?: string;
  classNameIcon?: string;
};

const HrText: React.FC<TextProps> = ({
  className,
  title,
  icon,
  classNameIcon,
}) => {
  return (
    <div className={cm('flex items-center gap-base-sm', className)}>
      {icon && (
        <div
          className={cm(
            'relative top-0 size-7 transition-all duration-300 group-hover:top-base md:size-9 lg:size-11',
            classNameIcon,
          )}
        >
          {icon}
        </div>
      )}
      <span className="t !font-semibold text-base-50">{title}</span>
    </div>
  );
};

export default HrText;
