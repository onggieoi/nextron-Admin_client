import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Search,
} from 'react-feather';
import { NotificationManager } from 'react-notifications';

import Table from 'components/Table';
import { useDeleteMovieMutation, useMoviesQuery } from 'graphql/generated';
import Loading from 'components/Loading';

const cols = ['iamges', 'name', 'during', 'status'];

const CustomersPage = () => {
  const [dataTable, setData] = useState([] as any[]);

  const { data, loading, refetch } = useMoviesQuery();
  const [deleteMovie] = useDeleteMovieMutation();

  const refetchCustom = useCallback(() => { setTimeout(async () => await refetch(), 200) }, [refetch]);

  useEffect(() => {
    const mapper = data?.movies.map(({ id, name, images, isShow, duration }) => ({
      id, name,
      images: images?.map(({ url }) => url),
      subName: 'King Lion',
      status: isShow,
      during: duration,
    }));
    setData(mapper || []);
  }, [data]);

  const handleDelete = (id: number) => {
    deleteMovie({
      variables: { id }
    }).then(({ data }) => {
      if (data?.deleteMovie) {
        NotificationManager.success(
          `Deleted movie ${id}`,
          'Delete Successfull',
          2000,
        );
      } else {
        NotificationManager.error(
          `something wrong with ${id}`,
          'Delete failed',
          2000,
        );
      }

      refetchCustom();
    });
  }

  return (
    <>
      <div className='top-bar'>
        <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
          Movies
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-no-wrap items-center mt-2">
          <Link href='/movie/create'>
            <button className=" text-white bg-theme-100 shadow-md mr-2 px-5 py-2 rounded-md">Add New Movie</button>
          </Link>

          {/* <div className="w-full sm:w-auto mt-3 ml-auto">
            <div className="w-56 relative text-gray-700">
              <input type="text" placeholder="Search..."
                className="input w-56 box pr-10 placeholder-theme-13" />
              <Search className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
            </div>
          </div> */}
        </div>

        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <Table Cols={ cols } Data={ dataTable } type={ 'movie' } deleteFn={ handleDelete } />
        </div>

        {
          loading && (
            <div className='absolute' style={ { top: 10, left: '50%' } }>
              <Loading />
            </div>
          )
        }
      </div>
    </>
  );
};

export default CustomersPage;
