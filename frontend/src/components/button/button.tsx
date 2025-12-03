import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../libs/utils";
import { useFormStatus } from "react-dom";
import { Spinner } from "@radix-ui/themes";
const buttonVariants = cva(
  // "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",

  "w-full px-4 py-2 cursor-pointer flex  items-center justify-center gap-2 !leading-none whitespace-nowrap rounded-full text-sm font-normal hovor:opacity-50 pointer:cursor-pointer disabled:pointer-events-none disabled:opacity-50", 
  {
  variants: {
        size: {
        default: "h-[38px]",
        sm: "h-9",
        lg: "h-12",
        icon: "h-10 w-10",   
    },
    variant: {
      "default": "bg-primary text-primary-foreground hover:bg-primary-hover hover:opacity-50",
      "white": "bg-white text-white-foreground hover:bg-white-hover hover:opacity-50",
      "gray": "bg-gray-light text-primary hover:bg-secondary hover:opacity-50",
       "link": "bg-transparent text-xs text-gray-dark hover:text-primary-hover hover:opacity-60 p-0 h-auto",
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },

  }
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  onClick?: () => void;
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const Button = ({ className, variant='default', ref, size='default', onClick, asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
   const { pending } = useFormStatus();
  ///cn = “class names combiner”
  return (
    <Comp
      onClick={onClick}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {pending ? <Spinner size="2" />: props.children}
    </Comp>

  );
};

export default Button;