import React from 'react';
import Head from 'next/head';

import FormComponent from 'containers/Schedule/Form';
import Layout from 'containers/AppLayout';

const CreatePage = () => {
  return (
    <>
      <Head>
        <title>New Schedule | UNKNOWN</title>
      </Head>

      <Layout>
        <div className='top-bar'>
          <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
            Create Schedule
        </div>
        </div>

        <div className='p-5 mx-auto' style={{ maxWidth: '1500px' }}>
          <FormComponent />
        </div>
      </Layout>
    </>
  );
}

export default CreatePage;