import React from 'react';
import Head from 'next/head';

import Layout from 'containers/AppLayout';
import StatisticPage from 'containers/Statistic';

const Statistic = () => (
  <>
    <Head>
      <title>Statistic</title>
    </Head>
    <Layout>
      <StatisticPage />
    </Layout>
  </>
);

export default Statistic;
