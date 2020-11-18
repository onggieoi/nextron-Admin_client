import { createContext } from 'react';

interface AuthContextProps {
  authState: any;
  authDispatch: any;
}

export const AuthContext = createContext({} as AuthContextProps);
