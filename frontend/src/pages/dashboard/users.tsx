'use client';

import { createUser } from '../../actions/userActions';
import { useUsers } from '../../hooks/react-query-hooks/useUsers';
import { useQueryClient } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import Button from '@components/button/button';
import { Callout } from '@radix-ui/themes';
import {  SunIcon } from '@radix-ui/react-icons';
function UserPanel() {
  const { data: users, isLoading } = useUsers();
  const queryClient = useQueryClient();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  function handleRoleChange(role: string, checked: boolean) {
    setSelectedRoles((prev) => (checked ? [...prev, role] : prev.filter((r) => r !== role)));
  }

  const createUserAction = async (formData: FormData) => {
    'use server';
    selectedRoles.forEach((role) => formData.append('roles', role));

    const result = await createUser(formData);
    console.log(result);
    queryClient.invalidateQueries({ queryKey: ['users'] });
    setSelectedRoles([]);
  };
  return (
    <div className="max-w-lg mx-auto mt-10 rounded-xl border border-gray-200 bg-white shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">User Management</h2>
      <Callout.Root>
        <Callout.Icon>
          <SunIcon />
        </Callout.Icon>
        <Callout.Text>
          You will need admin privileges to install and access this application.
        </Callout.Text>
      </Callout.Root>

      <form
        action={createUserAction}
        className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100"
      >
        <input
          name="mobile"
          placeholder="Mobile"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        <div>
          <p className="mb-2 text-gray-700 font-medium">Roles:</p>
          <div className="flex gap-4">
            {['admin', 'user'].map((role) => (
              <label key={role} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  value={role}
                  checked={selectedRoles.includes(role)}
                  onChange={(e) => handleRoleChange(role, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700">{role}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        <Button type="submit">Create User</Button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Users</h3>

        {isLoading && <p className="text-sm text-gray-500 animate-pulse">Loading...</p>}

        <ul className="space-y-2">
          {users?.map((u) => (
            <li
              key={u._id}
              className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm"
            >
              {u.mobile} - {u.roles?.join(', ')}
            </li>
          ))}
        </ul>

        {!isLoading && users?.length === 0 && (
          <p className="text-gray-500 text-sm italic">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default function UserPanelWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<p className='text-2xl text-primary'>Loading users...</p>}>
        <UserPanel />
      </Suspense>
    </ErrorBoundary>
  );
}
