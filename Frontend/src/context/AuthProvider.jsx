import { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return {
      user: savedUser ? JSON.parse(savedUser) : null,
      isLoggedIn: !!savedUser
    };
  });

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthState({
      user: userData,
      isLoggedIn: true
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isLoggedIn: false
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user: authState.user, 
      isLoggedIn: authState.isLoggedIn, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};