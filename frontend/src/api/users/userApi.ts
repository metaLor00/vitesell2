import onError from '@utils/onError';
import { userRoutes } from '@routes/users';
import { get, post } from '../client';

export type User = {
  _id: string;
  mobile: string;
  roles: string[];
  needsPassword?: boolean;
};

export async function fetchUsers(): Promise<User[]> {
  try {
    return await get<User[]>(userRoutes.getAllUsers);
  } catch (e: any) {
    const normalized = onError(e);
    const err = new Error(normalized.message || 'Failed to fetch users');
    (err as any).status = normalized.status;
    (err as any).errors = normalized.errors;
    throw err;
  }
}

export async function createUser(body: {
  mobile: string;
  roles?: string[];
  password?: string;
}): Promise<User> {
  try {
    return post<User>(userRoutes.createUser, body);
  } catch (e: any) {
    const normalized = onError(e);
    const err = new Error(normalized.message || 'Failed to create user');
    (err as any).status = normalized.status;
    (err as any).errors = normalized.errors;
    throw err;
  }
}
