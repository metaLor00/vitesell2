import { useEffect, useState } from 'react';

const useCounterUp = (
  targetValue: string | undefined,
  hasCounter: boolean | undefined,
  duration = 2000,
): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (hasCounter && targetValue) {
      const parsedValue = Number.parseInt(targetValue.replace(/,/g, ''), 10);

      if (!Number.isNaN(parsedValue)) {
        const steps = 60;
        const stepTime = duration / steps;

        duration;
        const increment = parsedValue / steps;
        let currentCount = 0;

        const interval = setInterval(() => {
          currentCount += increment;

          setCount(Math.min(Math.round(currentCount), parsedValue));

          if (currentCount >= parsedValue) {
            clearInterval(interval);
          }
        }, stepTime);

        return (): void => clearInterval(interval);
      }
    } else if (targetValue) {
      setCount(Number.parseInt(targetValue.replace(/,/g, ''), 10));
    }
  }, [hasCounter, targetValue, duration]);

  return count;
};

export default useCounterUp;
