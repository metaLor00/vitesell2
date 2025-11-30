import Input from '@components/core/fields/input/Input';
import HeadingWithCta from '@components/core/hr/HeadingWithCta';
import BackButton from '@components/core/‌Buttons/BackButton';
import Button from '@components/core/‌Buttons/Button';
type FormForgotPasswordProps = {
  handleSetCurrentForm: (currentForm: string) => void;
  handleSetNextStep: (nextStep: string) => void;
};
const FormForgotPassword: React.FC<FormForgotPasswordProps> = ({
  handleSetCurrentForm,
  handleSetNextStep,
}) => {
  const handleSendOtp = (): void => {
    handleSetNextStep('continue');
    handleSetCurrentForm('form-otp');
  };
  return (
    <form
      className="form flex flex-col gap-base-xs lg:gap-base-sm"
      autoComplete="off"
    >
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
        <HeadingWithCta title="فراموشی رمز عبور" className="xl:t-xl" />
        <BackButton
          handlClick={(): void => handleSetCurrentForm('form-auth-step-one')}
        />
      </div>
      <span className="subtitle t text-base-50 mb-base-md">
        ایمیل یا موبایلی که با آن ثبت نام کرده‌اید را وارد کنید
      </span>
      <div className="content flex flex-col gap-base-sm">
        <Input
          className="py-base-sm"
          name="unique_key"
          placeholder="ایمیل یا موبایل"
        />
        <Button
          variant="primary"
          size="lg"
          className="border-0"
          onClick={handleSendOtp}
        >
          ارسال کد فعال سازی
        </Button>
      </div>
      <div className="footer mt-base-md flex justify-center" />
    </form>
  );
};
export default FormForgotPassword;
