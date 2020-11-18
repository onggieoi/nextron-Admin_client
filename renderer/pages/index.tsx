import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import PointOfSale from 'containers/PointOfSale';
import Layout from 'containers/AppLayout';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Point of Sales</title>
    </Head>
    <Layout>
      <PointOfSale />
    </Layout>
  </>
);

export default Home;
