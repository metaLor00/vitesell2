import HeadingWithCta from '@components/core/hr/HeadingWithCta';
import { useSendOtp } from '@hooks/useSendOtp';
import type React from 'react';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../../../components/input/input';
import { Button } from '../../../../stories/Button';
type FormAuthStepOneProps = {
  handleSetCurrentForm: (currentForm: string) => void;
  authSetting: any;
  uniqueKey: string;
  setUniqueKey: React.Dispatch<React.SetStateAction<string>>;
};
type Inputs = {
  unique_key: string;
};
const FormAuthStepOne: React.FC<FormAuthStepOneProps> = ({
  authSetting,
  handleSetCurrentForm,
  setUniqueKey,
  uniqueKey,
}) => {
  const { sendOtp, isLoading, error, response } = useSendOtp();
  const [placeholder, setPlaceholder] = useState<string>(
    authSetting.loginFields.priority1.field.configs.placeholder,
  );
  const [label, setLabel] = useState<string>(
    authSetting.loginFields.priority1.field.configs.label,
  );
  const [authType, setAuthType] = useState<string>(
    authSetting.loginFields.priority1.authType,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const handleContinue = async (data: Inputs): Promise<void> => {
    if (authType === 'otp') {
      await sendOtp(data.unique_key);
      if (!error) {
        handleSetCurrentForm('form-otp');
      }
    } else {
      handleSetCurrentForm('form-password');
    }
  };
  const handleUniqueKeyChange = (uniqueKey: string): void => {
    setUniqueKey(uniqueKey);
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleContinue(data);
  };
  return (
    <form
      className="form flex flex-col gap-base-xs lg:gap-base-sm"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="title">
        <HeadingWithCta title="حساب کاربری" />
      </div>
      <span className="subtitle t text-base-50 mb-base-md">
        لطفا {authSetting.authTitle} خود را وارد نمایید{' '}
      </span>
      <div className="content flex flex-col gap-base-sm">
        <Input
          className="py-base-sm"
          name="unique_key"
          placeholder={placeholder}
          onChange={(e): void => handleUniqueKeyChange(e.target.value)}
          register={register('unique_key', { required: true })}
        />
        <Button variant="primary" size="lg" className="border-0" type="submit">
          ادامه
        </Button>
      </div>
      <div className="footer mt-base-sm">
        <div className="flex flex-col gap-base-xs">
          {errors.unique_key && (
            <span className="t text-danger-50">{label} الزامی است</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormAuthStepOne;
