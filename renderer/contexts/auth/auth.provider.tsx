/* eslint-disable @typescript-eslint/naming-convention */
import React, { useReducer } from 'react';

import { AuthContext } from 'contexts/auth/auth.context';
import { getLocalState } from 'helper/localStorage';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
      };
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

const AuthProvider = (props: any) => {
  const auth = getLocalState('auth');

  const [authState, authDispatch] = useReducer(
    reducer,
    {
      isAuthenticated: !!auth?.token,
      user: {
        name: auth?.full_name || null,
        agency: auth?.agency_name || null,
        amount: auth?.amount || 0,
      },
    },
  );

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
