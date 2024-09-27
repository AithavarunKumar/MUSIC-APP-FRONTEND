import { useState } from "react";

interface User {
  username: string;
}

interface AuthServiceProvider {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

function useAuthService(): AuthServiceProvider {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): void => {
    // Call API to authenticate user
    // If success, set user to state
    setUser({ username });
  };

  const logout = (): void => {
    // Call API to logout
    // If success, remove user from state
    setUser(null); // Set user state to null to signify logout
  };

  return {
    user,
    login,
    logout,
  };
}

export default useAuthService;
