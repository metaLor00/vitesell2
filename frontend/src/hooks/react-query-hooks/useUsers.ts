import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../api/users/userApi';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    // Disable automatic polling by default (set to a number if you need polling).
    refetchInterval: false,
    // Don't refetch on window focus to avoid unexpected reloads during dev/UX
    refetchOnWindowFocus: false,
    // Cache for 5 minutes to avoid refetching on mount frequently
    staleTime: 1000 * 60 * 5,
  });
}
