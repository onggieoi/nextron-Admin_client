import React, { useContext } from 'react';
import { Form, Formik } from 'formik';
import { NotificationManager } from 'react-notifications';

import TextField from 'components/FormInput/Text';
import PasswordField from 'components/FormInput/Password';
import { AuthContext } from 'contexts/Auth';
import { ModalContext } from 'contexts/Modal';

const SignUp = () => {
  const { login } = useContext(AuthContext);
  const { onClose } = useContext(ModalContext);

  return (
    <>
      <Formik
        initialValues={{
          fullname: '',
          username: '',
          password: '',
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          setTimeout(() => {

            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ isSubmitting, values, status }) => (
          <Form className='flex flex-col'>
            <TextField name="fullname" type="text" label="Full Name" placeholder='thanhminhvu' />
            <TextField name="username" type="text" label="Username" />
            <PasswordField name="password" label="Password" />

            {
              status && (
                <div className='text-red-600'>{status}</div>
              )
            }

            <button type="submit" disabled={isSubmitting}
              className="button inline-block bg-theme-100 text-white mt-5 py-3 text-lg font-bold">
              Submit
            {isSubmitting && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
            </button>
          </Form>
        )}
      </Formik>

    </>
  );
};

export default SignUp;
