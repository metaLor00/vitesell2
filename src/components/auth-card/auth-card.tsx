import Button from "../button/button";
interface AuthCardProps {
  title?: string;
  description?: string;
  onClick?: () => void;
  buttonText?: string;
  subtitle?: string;
  children?: React.ReactNode;
}
const AuthCard = ({children, title, description ,onClick,buttonText,subtitle }: AuthCardProps) => {
  return (
    <div className="flex flex-col  px-6 py-8 rounded-md bg-white shadow-sm">
      <div className="text-center mb-9">
        {title && <h3 className="text-lg font-semibold text-primary">{title}</h3>}
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <div className="mb-6">
        {children}
      </div>
      <Button variant="default" onClick={onClick}  className="mb-1" size={"lg"}>
          {buttonText}
      </Button>
      <div className="flex flex-col items-start gap-1">
        <span className="text-xs text-gray-dark">
          {subtitle}
        </span>
        <a href="#" className="text-xs text-gray-dark">
          ورود با رمز 
        </a>
      </div>
    </div>
  );
};

export default AuthCard;