import React, { useEffect, useContext } from 'react';
import Head from 'next/head';

import SignIn from 'containers/Auth/AuthComponent'
import { AuthContext } from 'contexts/Auth';
import { useRouter } from 'next/router';

const Login = () => {
  const { isAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
  }, [isAuth]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div style={{ height: '95vh' }} >
        <div className=' absolute top-0 left-0'>
          <img className='max-w-xs' src="/logo.png" alt="" />
        </div>

        <SignIn />
      </div>
    </>
  );
};

export default Login;
