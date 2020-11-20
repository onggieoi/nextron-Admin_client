import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Layout from 'containers/AppLayout';
import ScheduleContainer from 'containers/Schedule';

const Schedule: NextPage = () => {

  return (
    <>
      <Head>
        <title>Schedules | UNKNOWN</title>
      </Head>
      <Layout>
        <ScheduleContainer />
      </Layout>
    </>
  );
};

export default Schedule;
