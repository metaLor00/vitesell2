import PersianDatePicker from '@components/core/datepicker/PersianDatePicker';
import Input from '@components/core/fields/input/Input';
import Select from '@components/core/fields/select/select';
import HeadingWithCta from '@components/core/hr/HeadingWithCta';
import { SelectCustom } from '@components/core/select/custom-select';
import Button from '@components/core/‌Buttons/Button';
import type React from 'react';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
const guideOptions = [
  { id: '1', label: 'شیراز', value: 'shiraz' },
  { id: '2', label: 'تهران', value: 'tehran' },
  { id: '3', label: 'اردبیل', value: 'ardebil' },
  { id: '4', label: 'بوشهر', value: 'boshrah' },
  { id: '5', label: 'یاسوج', value: 'yasuj' },
];
type Inputs = {
  date: string;
  email: string;
  mobile: string;
  password: string;
  national_code: string;
  display_name: string;
  username: string;
  city: string;
  gender: string;
};
const Onboarding: React.FC = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const handleConfirmEmail = (): void => {
    setEmailVerified(true);
  };
  const handleConfirmMobile = (): void => {
    setMobileVerified(true);
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="form flex flex-col gap-base-xs lg:gap-base-md p-base-md my-base-xl"
    >
      <div className="title">
        <HeadingWithCta title="تکمیل اطلاعات" />
        <span className="t-xs sm:t !font-600 text-base-50">
          کاربر گرامی جهت استفاده از خدمات سایت باید اطلاعات حساب کاربری خود را
          تکمیل کنید.
        </span>
      </div>
      <div className="content flex flex-col gap-base-sm">
        <Controller
          name="city"
          control={control}
          render={({ field: { onChange } }): React.ReactElement => (
            <SelectCustom
              placeholder="شهر"
              options={guideOptions}
              onChange={(e): void => onChange(e)}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange } }): React.ReactElement => (
            <SelectCustom
              options={[
                { label: 'مرد', value: 'male' },
                { label: 'زن', value: 'female' },
              ]}
              onChange={(e): void => onChange(e)}
              placeholder="جنسیت"
            />
          )}
        />
        <Input
          name="email"
          type="text"
          placeholder="ایمیل"
          register={register('email', { required: true })}
        >
          {emailVerified ? (
            <Button light size="sm" variant="success">
              تایید شده
            </Button>
          ) : (
            <Button
              light
              size="sm"
              variant="secondary"
              onClick={handleConfirmEmail}
            >
              تایید ایمیل
            </Button>
          )}
        </Input>
        <Input
          name="mobile"
          type="text"
          placeholder="موبایل"
          register={register('mobile', { required: true })}
        >
          {mobileVerified ? (
            <Button light size="sm" variant="success">
              تایید شده
            </Button>
          ) : (
            <Button
              light
              size="sm"
              variant="secondary"
              onClick={handleConfirmMobile}
            >
              تایید موبایل
            </Button>
          )}
        </Input>
        <Input
          name="password"
          type="password"
          placeholder="رمز عبور"
          autoComplete="new-password"
          register={register('password', { required: true })}
        />
        <Input
          name="national_code"
          placeholder="کد ملی"
          register={register('national_code', { required: true })}
        />
        <Input
          name="display_name"
          placeholder="نام کامل و واقعی شما"
          register={register('display_name', { required: true })}
        />
        <Input
          name="username"
          placeholder="نام کاربری"
          register={register('username', { required: true })}
        />
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({
            field: { onChange, name, value },
            fieldState: { invalid, isDirty }, //optional
            formState: { errors }, //optional, but necessary if you want to show an error message
          }): React.ReactElement => (
            <PersianDatePicker
              name={name}
              value={value || ''}
              handlePickDate={onChange}
              className="my-date-picker"
            />
          )}
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="border-0 mt-base-md"
        >
          تایید
        </Button>
      </div>
      <div className="footer mt-base-sm">
        <div className="flex flex-col  gap-base-xs">
          {errors?.date && errors.date.type === 'required' && (
            <span className="t text-danger-50">وارد کردن تاریخ الزامی است</span>
          )}
          {errors.password && (
            <span className="t text-danger-50">پسورد الزامی است</span>
          )}
          {errors.email && (
            <span className="t text-danger-50">ایمیل الزامی است</span>
          )}
          {errors.username && (
            <span className="t text-danger-50">نام کاربری الزامی است</span>
          )}
          {errors.national_code && (
            <span className="t text-danger-50">کد ملی الزامی است</span>
          )}
          {errors.display_name && (
            <span className="t text-danger-50">
              نام کامل و واقعی الزامی است
            </span>
          )}
          {errors.mobile && (
            <span className="t text-danger-50">موبایل الزامی است</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default Onboarding;
