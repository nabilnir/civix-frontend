import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      
      try {
        const res = await axiosSecure.get(`/api/auth/users/${user.email}`);
        return res.data.data;
      } catch (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
    },
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  return {
    role: userData?.role || 'citizen',
    userData,
    isLoading,
    isPremium: userData?.isPremium || false,
    isBlocked: userData?.isBlocked || false,
  };
};

export default useRole;