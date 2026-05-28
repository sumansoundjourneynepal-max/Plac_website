import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Admin credentials
  const ADMIN_USERNAME = 'snstech';
  const ADMIN_PASSWORD = '$@mm!!15theM@n';

  const login = (user: string, pass: string): boolean => {
    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUsername(user);
      // Store in localStorage for persistence
      localStorage.setItem('authToken', 'admin-token');
      localStorage.setItem('username', user);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
  };

  // Check if user was previously logged in
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
      setUsername(localStorage.getItem('username'));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
