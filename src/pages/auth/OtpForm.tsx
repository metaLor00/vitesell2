import { useState } from 'react';
import AuthCard from '../../components/auth-card/auth-card';
import Button from '../../components/button/button';
import OTPInput from '../../components/otp/otp';
import SecondCountdown from '../../components/SecondCountdown';
import { useAuthCurrentCard } from '../../store/cotexts/auth-current-card';
const OtpForm = () => {
  const { setCurrentCard } = useAuthCurrentCard();
  const [finishedCounter, setFinishedCounter] = useState<boolean>(false);
  const handleResendCode = () => {
    console.log('resend code');
    setFinishedCounter(false);
  };
  return (
    <form>
      <AuthCard
        title="کد تایید"
        onClick={() => {}}
        subActionHandler={() => {
          setCurrentCard('step-one');
        }}
        buttonText="ادامه"
        subActionText="ویرایش شماره تلفن"
      >
        <OTPInput
          numInputs={6}
          inputType="text"
          onChange={(otp) => {
            console.log(otp);
          }}
        />
       <div className="flex justify-center items-center pt-6">
        {finishedCounter ? (
          <Button variant="link" onClick={handleResendCode}>ارسال مجدد</Button>
        ) : (
          <SecondCountdown
            seconds={120}
            handleSetFinishedCounter={(finishedCounter) => {
              setFinishedCounter(finishedCounter);
            }}
          />
        )}
        </div>
      </AuthCard>
    </form>
  );
};

export default OtpForm;
