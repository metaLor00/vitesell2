import { useCallback, useState, useMemo, useTransition, useId, memo } from "react";
import Button from "../button/button";
import { cn, formatPrice, parsePrice, toPersianDigits } from "../../libs/utils";
import Input from "../input/input";

interface PriceRangeProps {
  minLabel?: string
  maxLabel?: string
  applyLabel?: string
  titleLabel?: string
  currencyLabel?: string
  min?: number
  max?: number
  step?: number
  onApply?: (min: number, max: number) => void
  disabled?: boolean
  rtl?: boolean
};
const PriceRange = ({ minLabel = "از",
  maxLabel = "تا",
  applyLabel = "اعمال تغییرات",
  titleLabel = "محدوده قیمت",
  currencyLabel = "تومان",
  min: initialMin = 1000000,
  max: initialMax = 100000000,
  step = 100000,
  onApply,
  disabled = false,
  rtl = true }: PriceRangeProps) => {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);
  // keep separate input strings to avoid formatting while typing (prevents caret jumps)
  const [minInput, setMinInput] = useState<string>(formatPrice(initialMin));
  const [maxInput, setMaxInput] = useState<string>(formatPrice(initialMax));

  const [isPending, startTransition] = useTransition();

  const handleRangeChange = useCallback(
    (type: "min" | "max", value: number) => {
      if (type === "min") {
        const newMin = Math.min(value, maxValue - step);
        // schedule formatting/state update as non-urgent to keep UI responsive
        startTransition(() => {
          setMinValue(newMin);
          setMinInput(formatPrice(newMin));
        });
      } else {
        const newMax = Math.max(value, minValue + step);
        startTransition(() => {
          setMaxValue(newMax);
          setMaxInput(formatPrice(newMax));
        });
      }
    }, [minValue, maxValue, step]);

  // Handle input typing: update local string only to avoid formatting on every keystroke
  const handleInputTyping = useCallback((type: "min" | "max", value: string) => {
    // convert any latin digits to persian digits as the user types
    const converted = toPersianDigits(value);
    if (type === "min") {
      setMinInput(converted)
    } else {
      setMaxInput(converted)
    }
  }, [])

  // Commit typed value: parse and update numeric state, then format the input
  const handleInputCommit = useCallback((type: "min" | "max", value: string) => {
    const parsed = parsePrice(value)
    if (type === "min") {
      const newMin = Math.min(parsed, maxValue - step)
      startTransition(() => {
        setMinValue(newMin)
        setMinInput(formatPrice(newMin))
      })
    } else {
      const newMax = Math.max(parsed, minValue + step)
      startTransition(() => {
        setMaxValue(newMax)
        setMaxInput(formatPrice(newMax))
      })
    }
  }, [minValue, maxValue, step])
  const rangeTotalLength = useMemo(() => initialMax - initialMin, [initialMax, initialMin]);

  const trackStyle = useMemo(() => {
    const percent1 = ((minValue - initialMin) / (rangeTotalLength)) * 100;
    const percent2 = ((maxValue - initialMin) / (rangeTotalLength)) * 100;
    return {
      right: `${percent1}%`,
      left: `${100 - percent2}%`,
    } as React.CSSProperties;
  }, [minValue, maxValue, initialMin, rangeTotalLength]);

  const id = useId();

  // specialized handlers so JSX doesn't recreate inline lambdas
  const handleMinTyping = useCallback((v: string) => handleInputTyping("min", v), [handleInputTyping]);
  const handleMaxTyping = useCallback((v: string) => handleInputTyping("max", v), [handleInputTyping]);
  const handleMinCommit = useCallback((v: string) => handleInputCommit("min", v), [handleInputCommit]);
  const handleMaxCommit = useCallback((v: string) => handleInputCommit("max", v), [handleInputCommit]);

  const handleApply = useCallback(() => {
    if (!onApply) return;
    startTransition(() => onApply(minValue, maxValue));
  }, [onApply, minValue, maxValue]);
  return (
    <div dir={rtl ? "rtl" : "ltr"} className="flex flex-col gap-2 p-2 range">
      {/* title (uses prop to avoid unused var) */}
      <div className="text-sm text-muted mb-1">{titleLabel}</div>
      <div className="relative h-8 ">
        {/* Track background */}
        <div className="absolute w-full h-1 bg-gray-light rounded-full" />

        {/* Active track */}
        <div
          className="absolute top-0.5 h-0.5 bg-primary rounded-full transition-all"
          style={{
            left: trackStyle.left,
            right: trackStyle.right,
          }}
        />
        <input className={cn(
          "absolute  w-full h-1 bg-transparent rounded-full appearance-none pointer-events-none cursor-pointer",
          "slider-thumb-min",
        )}
          style={{
            zIndex: minValue > initialMax - (initialMax - initialMin) / 2 ? 5 : 3,
          }}

          value={minValue} onChange={(e) => handleRangeChange("min", Number(e.target.value))}
          name="min-price" type="range" min={initialMin} max={initialMax} step={step} />
        <input className={cn(
          "absolute w-full h-1 bg-transparent rounded-full appearance-none pointer-events-none cursor-pointer",
          "slider-thumb-max",
        )}
          style={{
            zIndex: 4,
          }}
          value={maxValue} onChange={(e) => handleRangeChange("max", Number(e.target.value))} name={`max-price-${id}`} type="range" min={initialMin} max={initialMax} step={step} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Input type="text" dir="ltr" className="bg-gray-light outline-none"
            value={minInput}
            onChange={(e) => handleMinTyping(e.target.value)}
            onBlur={(e) => handleMinCommit(e.target.value)}
            disabled={disabled}
            labelRight={minLabel}
            labelLeft={currencyLabel}
            variant="outline-rounded"
            />
        </div>
                 <div className="flex items-center gap-3">
          <Input type="text" dir="ltr" className="bg-gray-light outline-none"
            value={maxInput}
            onChange={(e) => handleMaxTyping(e.target.value)}
            onBlur={(e) => handleMaxCommit(e.target.value)}
            disabled={disabled}
            labelRight={maxLabel}
            labelLeft={currencyLabel}
            variant="outline-rounded"
            />
        </div>
      </div>
      <Button variant="gray" onClick={handleApply} disabled={disabled || isPending}>{applyLabel}</Button>
    </div>
  );
};

export default memo(PriceRange);