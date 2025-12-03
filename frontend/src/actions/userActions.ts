'use server';

import { createServerAction } from './createServerAction';
import { apiFetch } from '@api/http-client';
import { adminRoutes } from '@api/routes/users';
import onError from '@utils/onError';
import validate from '@utils/validation';

type CreateUserResult = {
  _id: string;
  mobile: string;
  roles: string[];
};


const schema = {
  mobile: { required: true, pattern: /^09\\d{9}$/, message: 'Invalid mobile' },
  password: { min: 8 },
  roles: { required: true },
};
export const createUser = createServerAction<FormData, CreateUserResult>(
  async (formData: FormData) => {
    const body: {
      mobile: string;
      roles?: string[];
      password?: string;
    } = {
      mobile: formData.get('mobile') as string,
      roles: (formData.getAll('roles') as string[]) || [],
      password: formData.get('password') as string,
    };

    const result = await apiFetch<CreateUserResult>(adminRoutes.createUser, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return result;
  },
  {
    validate(data) {
      validate(data, schema);
    },
    onError(error) {
      const normalized = onError(error as any);
      return normalized;
    },
  },
);
