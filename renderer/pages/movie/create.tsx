import React from 'react';
import Head from 'next/head';

import FormComponent from 'containers/Movie/Form';
import Layout from 'containers/AppLayout';

const CreatePage = () => {
  return (
    <>
      <Head>
        <title>New Movie | UNKNOWN</title>
      </Head>

      <Layout>
        <div className='top-bar'>
          <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
            Create Movies
        </div>
        </div>

        <div className='p-5 mx-auto' style={ { maxWidth: '1000px' } }>
          <FormComponent />
        </div>
      </Layout>
    </>
  );
}

export default CreatePage;