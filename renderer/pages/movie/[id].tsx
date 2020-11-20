import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useMovieQuery } from 'graphql/generated';

import Layout from 'containers/AppLayout';
import Head from 'next/head';
import DetailPage from 'containers/Movie/Detail';
import Loading from 'components/Loading';

const MovieDetail = () => {
  const router = useRouter();
  const [state, setState] = useState(false);

  const { data } = useMovieQuery({
    variables: {
      id: Number(router.query?.id) || -1,
    }
  });

  useEffect(() => {
    if (data?.movie.error) {
      router.push('/404');
    }
    if (data?.movie.movie) {
      setState(true);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{ data?.movie.movie?.name } | UNKNOWN</title>
      </Head>

      <Layout>
        {
          state ? (
            <DetailPage movie={ data?.movie.movie } />
          ) : (
              <div className='absolute' style={ { top: 10, left: '50%' } }>
                <Loading />
              </div>
            )
        }
      </Layout>
    </>
  );
};

export default MovieDetail;