import React, { useContext } from 'react';
import { Form, Formik } from 'formik';
import { NotificationManager } from 'react-notifications';
import * as Yup from 'yup';
import nProgress from 'nprogress';

import TextField from 'components/FormInput/Text';
import { AuthContext } from 'contexts/Auth';
import { useSignInMutation } from 'graphql/generated';

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
});

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [SignIn] = useSignInMutation();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={SignInSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        nProgress.start();

        setTimeout(() => {
          SignIn({
            variables: {
              data: values
            }
          }).then(({ data }) => {
            if (data?.userSignIn?.user) {
              NotificationManager.success(
                `Welcome back ${data.userSignIn.user.fullname}`,
                'Login Successfull',
                2000,
              );

              login();
            } else {
              actions.setStatus('Invalid username or password');
            }
          });

          nProgress.done();
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className='flex flex-col'>
          <TextField name="username" type="text" label="Username" />
          <TextField name="password" type='password' label="Password" />

          {
            status && (
              <div className='text-red-600'>{status}</div>
            )
          }

          <button type="submit" disabled={isSubmitting}
            className="button inline-block bg-theme-100 text-white mt-5 py-3 font-bold text-lg">
            Submit
            {(isSubmitting) && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
