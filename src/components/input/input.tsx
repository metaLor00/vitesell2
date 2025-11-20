import React from "react";
import { cn } from "../../libs/utils";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text displayed above or inside the input (supports Persian/RTL) */
  label?: string;
  /** Icon or element to display on the left side of input (appears on right in RTL) */
  iconLeft?: string;
  /** Icon or element to display on the right side of input (appears on left in RTL) */
  iconRight?: string;
  /** Size variant */
  size?: "sm" | "base" | "lg";
  /** Container className for custom styling */
  containerClassName?: string;
  /** Label className for custom styling */
  labelClassName?: string;
  /** Enable RTL layout (auto-detected from dir attribute or html lang) */
  dir?: "ltr" | "rtl";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      iconLeft,
      iconRight,
      size = "base",
      className,
      containerClassName,
      labelClassName,
      dir="rtl",
      ...props
    },
    ref
  ) => {
    // Auto-detect RTL from document or use provided dir
    const isRTL = dir === "rtl";

    const sizeClasses = {
      sm: "h-8 px-3 py-1 text-sm",
      base: "h-12 px-3 py-[14px] text-base",
      lg: "h-12 px-5 py-3 text-lg",
    };

    return (
      <div 
        className={cn("flex flex-col gap-1 w-full", containerClassName)}
      >
        {label && (
          <label
            htmlFor={props.id || props.name}
            className={cn(
              "text-sm font-medium text-gray-700",
              "text-right" // Persian text should be right-aligned
              ,
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
  
    {/* IconRight appears on the left in RTL, right in LTR */}
          {iconRight && (
            <span 
              className={cn(
                "absolute flex items-center pointer-events-none text-gray-500",
                isRTL ? "left-3" : "right-3"
              )}
            >
              <i className={iconRight}></i>
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full border border-gray-300 rounded-lg outline-none",
              "transition-colors duration-200",
              "placeholder:text-gray-400",
              "focus:border-primary focus:ring-1 focus:ring-primary",
              "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed",
              // Adjust padding based on icon presence and RTL
              isRTL 
                ? cn(iconLeft && "pe-10", iconRight && "ps-10")
                : cn(iconLeft && "ps-10", iconRight && "pe-10"),
              sizeClasses[size],
              className
            )}
            dir={isRTL ? "rtl" : "ltr"}
            {...props}
          />
                  {/* IconLeft appears on the right in RTL, left in LTR */}
          {iconLeft && (
            <span 
              className={cn(
                "absolute flex items-center pointer-events-none text-gray-500",
                isRTL ?"left-3"  : "right-3"
              )}
            >
            <i className={iconLeft}></i>
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;