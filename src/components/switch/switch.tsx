import { useState } from "react";
import { cn } from "../../libs/utils";
interface SwitchProps {
    name?: string;
    onChange?: (checked: boolean) => void;
    className?: string;
    label1?: string;
    label2?: string;
    size?: "sm" | "base" | "lg";

}
const Switch = ({ label1, label2, size = 'base', onChange, className }: SwitchProps) => {
    const [selected, setSelected] = useState(label1);
    const sizeClasses = {
        sm: "h-8 px-3 py-1 text-sm",
        base: "h-12 px-3 py-[14px] text-base",
        lg: "h-12 px-5 py-3 text-lg",
    };
    const handleChange = (e: any) => {
        setSelected(e);
        onChange && onChange(e);
    };
    return (
        <div className={cn("relative color-primary flex overflow-hidden bg-gray-light rounded-full", className)}>
            <label className={cn(selected === label1 && "bg-primary color-white", "grow  text-center rounded-full  transition-all duration-500 ease-in-out", sizeClasses[size])} >
                {label1}
                <input name={label1} type="checkbox" hidden className="" onChange={(e) => handleChange(e.target.name)} />
            </label>
            <label className={cn(selected === label2 && "bg-primary", "grow  text-center rounded-full  transition-all duration-500 ease-in-out", sizeClasses[size])}>
                {label2}
                <input name={label2} type="checkbox" hidden className="" onChange={(e) => handleChange(e.target.name)} />
            </label>
        </div>
    );
};

export default Switch;