import AuthCard from '../../components/auth-card/auth-card';
import Input from '../../components/input/input';
import { useAuthCurrentCard } from '../../store/cotexts/auth-current-card';
const AuthStepOne = () => {
    const {setCurrentCard}=useAuthCurrentCard();
    const handleSubAction=()=>{
        setCurrentCard("password-card");
    };
  return (
    <form>
      <AuthCard
        title="ورود"
        onClick={() => {setCurrentCard("otp-card")}}
        buttonText="ورود"
        subtitle="با ثبت نام در سایت ویتسل قوانین و مقررات را  میپذیرم"
        subActionHandler={handleSubAction}
        subActionText="ورود با رمز"
      >
        <Input type="text" placeholder="۰۹۳۹۲۹۵۴۴۸۵۸۳" variant="rounded" dir="ltr" />
      </AuthCard>
    </form>
  );
};

export default AuthStepOne;