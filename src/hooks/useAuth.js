import { useAuth } from '../context/AuthContext';

export const useAuthUser = () => {
  const auth = useAuth();
  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.loading,
    login: auth.login,
    logout: auth.logout,
    updateUser: auth.updateUser,
  };
};

export default useAuthUser;
