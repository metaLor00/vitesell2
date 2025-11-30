 import { useState } from 'react';
import AuthCard from '../../components/auth-card/auth-card';
import Input from '../../components/input/input';
import { useAuthCurrentCard } from '../../store/cotexts/auth-current-card';
const PasswordForm = () => {
  const {setCurrentCard}=useAuthCurrentCard();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    console.log(showPassword);
    setShowPassword(!showPassword);
  };
  return (
    <form>
      <AuthCard
        title="ورود"
        onClick={() => {setCurrentCard("otp-card")}}
        buttonText="ورود"
        subtitle="با ثبت نام در سایت ویتسل قوانین و مقررات را  میپذیرم"
        subActionHandler={()=>{setCurrentCard("otp-card")}}
        subActionText="ورود با کد تایید"
      >
        <Input iconActionHandler={handleShowPassword} iconRight='i-eye' type={showPassword ? 'text' : 'password'} placeholder="••••••••••••••••" variant="rounded" dir="ltr" />
      </AuthCard>
    </form>
  );
};

export default PasswordForm;