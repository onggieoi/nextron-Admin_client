import { createContext, useState, useEffect } from 'react';

import { useLogoutMutation, useMeQuery } from 'graphql/generated';

interface AuthContext {
  isAuth: boolean;
  logout: Function;
  login: Function;
}

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(true);

  const { data, refetch, } = useMeQuery({
    onCompleted: () => {
      setAuth(!!data?.me?.user)
    },
    fetchPolicy: 'no-cache',
  });

  const [Logout] = useLogoutMutation();

  const logout = async () => {
    const logoutResult = await Logout();
    if (logoutResult) {
      setAuth(false);
    }
  };

  const login = () => {
    setAuth(true);
  }

  return (
    <AuthContext.Provider
      value={ {
        isAuth,
        logout,
        login,
      } }
    >
      {children }
    </AuthContext.Provider>
  );
};
