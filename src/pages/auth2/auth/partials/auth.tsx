import Loading1 from '@components/core/Loadings/Loading1';
import { useState, useEffect } from 'react';
import { authApi } from '@constants/ApiPath';
import RequestHandler from '@services/RequestHandler';
import FormAuthStepOne from './form_auth_step_one';
import FormPassword from './form_password';
import FormOtp from './form_otp';
import FormForgotPassword from './form_forgot_password';
import FormChangePassword from './form_change_password';

const authSettingTest = {
  loginFields: {
    priority1: {
      authType: 'password',
      field: {
        name: 'mobile',
        validation: {
          pattern: '[0-9]{9}',
          message: 'با ۰۹ شروع شده و طول آن ۱۱ رقم باشد',
        },
        configs: {
          placeholder: 'موبایل: ۰۹۱۱۱۱۱۱۱۱۱',
          label: 'شماره موبایل',
          require: true,
        },
      },
    },
    priority2: {
      help: '',
      authType: 'otp',
      field: {
        name: 'mobile',
        validation: {
          pattern: '[0-9]{9}',
          message: 'با ۰۹ شروع شده و طول آن ۱۱ رقم باشد',
        },
        configs: {
          placeholder: 'موبایل: ۰۹۱۱۱۱۱۱۱۱۱',
          label: 'شماره موبایل',
          require: true,
        },
      },
    },
  },
  registrationFields: {
    city: {
      name: 'city',
      validation: [],
      configs: {
        placeholder: 'شهر را وارد کنید...',
        label: 'شهر',
        require: false,
      },
    },
    email: {
      name: 'email',
      validation: [],
      configs: {
        placeholder: 'ایمیل: youremail@xyz.com',
        label: 'ایمیل',
        require: false,
      },
    },
    avatar: {
      name: 'avatar',
      validation: [],
      configs: {
        placeholder: 'تصویر پروفایل را وارد کنید...',
        label: 'تصویر پروفایل',
        require: false,
      },
    },
    gender: {
      name: 'gender',
      validation: [],
      configs: {
        placeholder: 'جنسیت را وارد کنید...',
        label: 'جنسیت',
        require: false,
      },
    },
    mobile: {
      name: 'mobile',
      validation: [],
      configs: {
        placeholder: 'موبایل: ۰۹۱۱۱۱۱۱۱۱۱',
        label: 'شماره موبایل',
        require: true,
      },
    },
    password: {
      name: 'password',
      validation: [],
      configs: {
        placeholder: 'گذرواژه شما حدقل ۸ و حداکثر ۱۶',
        label: 'رمز عبور',
        require: true,
      },
    },
    username: {
      name: 'username',
      validation: [],
      configs: {
        placeholder: 'نام کاربری خود را وارد کنید.',
        label: 'نام کاربری',
        require: false,
      },
    },
    display_name: {
      name: 'display_name',
      validation: [],
      configs: {
        placeholder: 'نام خود را وارد کنید.',
        label: 'نام',
        require: false,
      },
    },
    national_code: {
      name: 'national_code',
      validation: [],
      configs: {
        placeholder: 'کد ملی را وارد کنید...',
        label: 'کد ملی',
        require: false,
      },
    },
  },
  verificationFields: ['mobile'],
  authTitle: 'شماره موبایل',
  otp: {
    enable: true,
    codeLen: 6,
  },
  expireAt: '2025-02-14T10:08:00.745180Z',
};

type AuthProps = {};
const Auth: React.FC<AuthProps> = () => {
  const [currentForm, setCurrentForm] = useState<string>('form-auth-step-one');
  const [nextStep, setNextStep] = useState<string>('');
  const [authSetting, setAuthSetting] = useState(authSettingTest);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uniqueKey, setUniqueKey] = useState<string>('mehdibehvar00@gmail.com');

  useEffect(() => {
    const fetchAuthSetting = async () => {
      try {
        const response = await RequestHandler.get(authApi.SETTING);
        if (response.data.status) {
          setAuthSetting(response.data.result);
        } else {
          setError('Error fetching auth settings');
          console.error(response);
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching auth settings');
      } finally {
        setLoading(false);
      }
    };

    // fetchAuthSetting();
  }, []);

  const handleSetCurrentForm = (currentForm: string) => {
    setCurrentForm(currentForm);
  };
  const handleSetNextStep = (nextStep: string) => {
    setNextStep(nextStep);
  };
  if (loading) return <Loading1 />;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      {currentForm === 'form-auth-step-one' && (
        <FormAuthStepOne
          authSetting={authSetting}
          uniqueKey={uniqueKey}
          setUniqueKey={setUniqueKey}
          handleSetCurrentForm={handleSetCurrentForm}
        />
      )}
      {currentForm === 'form-password' && (
        <FormPassword
          authSetting={authSetting}
          uniqueKey={uniqueKey}
          handleSetNextStep={handleSetNextStep}
          handleSetCurrentForm={handleSetCurrentForm}
        />
      )}
      {currentForm === 'form-otp' && (
        <FormOtp
          nextStep={nextStep}
          handleSetCurrentForm={handleSetCurrentForm}
          handleSetNextStep={handleSetNextStep}
          uniqueKey={uniqueKey}
        />
      )}
      {currentForm === 'form-forgot-password' && (
        <FormForgotPassword
          handleSetCurrentForm={handleSetCurrentForm}
          handleSetNextStep={handleSetNextStep}
        />
      )}
      {currentForm === 'form-change-password' && (
        <FormChangePassword
          handleSetCurrentForm={handleSetCurrentForm}
          handleSetNextStep={handleSetNextStep}
        />
      )}
    </>
  );
};
export default Auth;
