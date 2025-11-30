import { useCallback, useEffect, useState } from 'react';

type UseCopyToClipboardProps = {
  successMessage?: string;
  failedMessage?: string;
  timerTime?: number;
};

const useCopyToClipboard = ({
  successMessage = 'کپی شد',
  failedMessage = 'کپی نشد',
  timerTime = 3000,
}: UseCopyToClipboardProps): [boolean, (text: string) => void] => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const handleCopyText = useCallback(
    (text: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setHasCopied(true);
          alert(successMessage);
        })
        .catch((error) => {
          console.error('Failed to copy text: ', error);
        });
    },
    [successMessage, failedMessage],
  );

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), timerTime);
      return (): void => clearTimeout(timer);
    }
  }, [hasCopied, timerTime]);

  return [hasCopied, handleCopyText] as const;
};

export default useCopyToClipboard;
