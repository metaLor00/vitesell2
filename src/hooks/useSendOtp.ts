import RequestHandler from '@services/RequestHandler';
import { useState } from 'react';
interface UseSendOtpResult {
  sendOtp: (uniqueKey: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  response: any;
}

export const useSendOtp = (): UseSendOtpResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const sendOtp = async (unique_key: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await RequestHandler.post('v3/auth/send-token', {
        unique_key,
      });
      if (res.data.status) {
        setResponse(res.data.result);
      }
    } catch (err) {
      setError('Error sending OTP');
      console.error('Error sending OTP', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendOtp, isLoading, error, response };
};
