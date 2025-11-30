import Button from '../button/button';
interface AuthCardProps {
  title?: string;
  description?: string;
  onClick?: () => void;
  buttonText?: string;
  subtitle?: string;
  children?: React.ReactNode;
  subActionHandler?: () => void;
  subActionText?: string;
}
const AuthCard = ({
  children,
  title,
  description,
  onClick,
  buttonText,
  subtitle,
  subActionHandler,
  subActionText = 'ورود با رمز',
}: AuthCardProps) => {
  return (
    <div className="flex flex-col  px-6 py-8 min-w-sm rounded-md bg-white shadow-sm">
      <header className="text-center mb-9">
        {title && <h3 className="text-lg font-semibold text-primary">{title}</h3>}
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </header>
      <div className="mb-6">{children}</div>
      <footer className="flex flex-col gap-1">
        <Button variant="default" onClick={onClick} className="mb-1" size={'lg'}>
          {buttonText}
        </Button>
        <div className=''>
          {subtitle && (
            <Button variant="link" className="mb-1 text-gray-dark">
              {subtitle}
            </Button>
          )}
          {subActionText && (
            <Button variant="link" className="mb-1 text-gray-dark" onClick={subActionHandler}>
              {subActionText}
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default AuthCard;
