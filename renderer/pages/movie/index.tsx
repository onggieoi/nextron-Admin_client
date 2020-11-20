import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Layout from 'containers/AppLayout';
import MoviePage from 'containers/Movie';


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Movies | UNKNOWN</title>
      </Head>
      <Layout>
        <MoviePage />
      </Layout>
    </>
  );
};

export default Home;