import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import PrintFirstPage from 'containers/PrintFirst';
import Layout from 'containers/AppLayout';

const PrintFirst: NextPage = () => (
  <>
    <Head>
      <title>Print First Page</title>
    </Head>
    <Layout>
      <PrintFirstPage />
    </Layout>
  </>
);

export default PrintFirst;
