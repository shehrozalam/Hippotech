import React from 'react';
import server from './server';
import { useLocation, Navigate } from 'react-router-dom';

let AuthContext = React.createContext(null);


export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}

export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);
  let signin = async (username, password, callback) => {
    console.log("Signing in...");
    const result = await server.loginAsync(username, password);
    if (result) setUser({ username });
    return result;
  };
  let signout = async () => {
    setUser(null);
    await server.logoutAsync();
  }

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>
}