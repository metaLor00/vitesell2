import { useAuthCurrentCard } from '../../store/cotexts/auth-current-card';
import AuthStepOne from './form-auth-step-one';
import OtpForm from './OtpForm';
import PasswordForm from './password-form';


const Login: React.FC = () => {
  const {currentCard}=useAuthCurrentCard();
  return (
    <div className="p-4">
        {currentCard === 'step-one' && (
          <AuthStepOne/>
        )}
        {currentCard==="otp-card"&& <OtpForm/>}
        {currentCard==="password-card"&& <PasswordForm/>}
    </div>
  );
};

export default Login;
