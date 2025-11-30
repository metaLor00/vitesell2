import Input from '@components/core/fields/input/Input';
import HeadingWithCta from '@components/core/hr/HeadingWithCta';
import BackButton from '@components/core/‌Buttons/BackButton';
import Button from '@components/core/‌Buttons/Button';
type FormChangePasswordProps = {
  handleSetCurrentForm: (currentForm: string) => void;
  handleSetNextStep: (nextStep: string) => void;
};
const FormChangePassword: React.FC<FormChangePasswordProps> = ({
  handleSetCurrentForm,
  handleSetNextStep,
}) => {
  const handleBack = (): void => {
    handleSetCurrentForm('form-otp');
    handleSetNextStep('continue');
  };
  return (
    <form
      className="form flex flex-col gap-base-xs lg:gap-base-sm"
      autoComplete="off"
    >
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
        <HeadingWithCta title="تغییر رمز عبور" />
        <BackButton handlClick={handleBack} />
      </div>
      <div className="content flex flex-col gap-base-sm">
        <Input
          name="password"
          className="py-base-sm"
          type="password"
          placeholder="رمز عبور"
        />
        <Input
          name="password"
          className="py-base-sm"
          type="password"
          placeholder="تکرار رمز عبور"
        />
        <Button variant="primary" size="lg" className="border-0">
          تایید
        </Button>
      </div>
      <div className="footer mt-base-sm">
        <div className="flex flex-col  gap-base-xs">
          {/* <span className="t-sm text-danger-50">خطایی رخ داده</span> */}
          {/* <span className="t-sm text-danger-50">خطایی رخ داده</span> */}
        </div>
      </div>
    </form>
  );
};

export default FormChangePassword;
