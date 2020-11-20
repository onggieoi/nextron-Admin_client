import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Dashboard from 'containers/Dashboard';
import Layout from 'containers/AppLayout';

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Dashboard | UNKNOWN</title>
      </Head>
      <Layout>
        <Dashboard />
      </Layout>
    </>
  );
};

export default Home;
