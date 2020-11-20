import React, { useEffect, useState } from 'react';

import Layout from 'containers/AppLayout';
import Head from 'next/head';
import DetailPage from 'containers/Schedule/Detail';
import { useScheduleQuery } from 'graphql/generated';
import { useRouter } from 'next/router';
import Loading from 'components/Loading';

const MovieDetail = () => {
  const router = useRouter();
  const [state, setState] = useState(false);

  const { data } = useScheduleQuery({
    variables: {
      id: Number(router.query?.id) || -1
    },
  });

  useEffect(() => {
    if (data?.schedule?.error) {
      router.push('/404');
    }
    if (data?.schedule?.schedule) {
      setState(true);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{data?.schedule?.schedule?.movie?.name} | UNKNOWN</title>
      </Head>

      <Layout>
        {
          state ? (
            <DetailPage schedule={data?.schedule?.schedule} />
          ) : (
              <div className='absolute' style={{ top: 10, left: '50%' }}>
                <Loading />
              </div>
            )
        }
      </Layout>
    </>
  );
};

export default MovieDetail;