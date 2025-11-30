import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../../libs/utils';

interface OTPInputProps {
  className?: string;
  numInputs: number;
  inputType?: string;
  onChange: (otp: string) => void;
  classNameField?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  className,
  classNameField,
  numInputs,
  inputType = 'text',
  onChange,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(numInputs).fill(''));

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    onChange(newOtp.join(''));

    if (value && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ): void => {
    if (e.key === 'Backspace' && !otp[index]) {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    const pastedData = e.clipboardData.getData('text').slice(0, numInputs);
    const newOtp = pastedData.split('');
    const updatedOtp = [...otp];

    newOtp.forEach((value, i) => {
      updatedOtp[i] = value;
    });

    setOtp(updatedOtp);
    onChange(updatedOtp.join(''));

    // Focus last filled input
    const lastFilledIndex = newOtp.length - 1;
    if (inputRefs.current[lastFilledIndex]) {
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

return (
  <div className={cn('flex flex-row-reverse gap-2', className)}>
    {Array.from({ length: numInputs }, (_, i) => i + 1).map((item, index) => (
      <div key={`otp-input-${item}`} className="relative flex flex-col items-center">
        <input
          dir="ltr"
          type={inputType}
          value={otp[index]}
          onChange={(e): void => handleChange(e.target.value, index)}
          onKeyDown={(e): void => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={cn(
            'w-12 h-12 text-center rounded-full bg-gray-light outline-none focus:border focus:border-primary',
            classNameField,
          )}
          maxLength={1}
          ref={(el: HTMLInputElement | null): void => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
        />
        {/* Dash under the input */}
        <span className="w-4 h-0.5 rounded-full bg-gray-4 absolute bottom-2" />
      </div>
    ))}
  </div>
);
};

export default OTPInput;
