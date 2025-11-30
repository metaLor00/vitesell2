import { cn } from "../../libs/utils";

type IconProps= {
    icon: string;
    additionalClasses?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, 'icon'>;

const Icon = ({icon, additionalClasses,...props}:IconProps)=>{
    return (
        <i  className={cn('icon ',icon,additionalClasses)} {...props} > </i>
    )
}

export default Icon;