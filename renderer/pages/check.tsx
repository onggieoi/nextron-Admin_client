import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from 'containers/AppLayout';

import CheckPage from 'containers/Check';

const Check: NextPage = () => (
  <>
    <Head>
      <title>Check Tickets</title>
    </Head>
    <Layout>
      <CheckPage />
    </Layout>
  </>
);

export default Check;
