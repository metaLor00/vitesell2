'use client';

import { createUser } from '../../actions/userActions';
import { useUsers } from '../../hooks/react-query-hooks/useUsers';
import { useQueryClient } from '@tanstack/react-query';

export default function UserPanel() {
  const { data: users, isLoading } = useUsers();
  const queryClient = useQueryClient();

  async function handleSubmit(formData: FormData) {
    const input = {
      mobile: formData.get('mobile') as string,
      role: formData.get('role') as string,
      password: formData.get('password') as string,
    };

    await createUser(input);

    queryClient.invalidateQueries({ queryKey: ['users'] }); // refresh client data
  }

  return (
    <div className="p-4 border-2 border-amber-500">
      <form action={handleSubmit} className='flex flex-col gap-2 mb-4 p-2'>
        <input name="mobile" placeholder="Mobile" />
        <input name="role" placeholder="Role" />
        <input name="password" placeholder="Password" type="password" />
        <button type="submit">Create</button>
      </form>

      {isLoading && <p>Loading...</p>}

      <ul>
        {users?.map((u) => (
          <li key={u._id}>{u.mobile}</li>
        ))}
      </ul>
    </div>
  );
}
