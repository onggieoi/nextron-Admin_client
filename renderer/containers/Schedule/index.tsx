import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Search,
} from 'react-feather';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import Table from 'components/Table';
import { TableItem } from 'interfaces';
import { cinemaOptions } from 'helper/constant';
import { formatDate, formatTime } from 'helper/functions';

import { useListSchedulesQuery } from 'graphql/generated';
import Loading from 'components/Loading';

const cols = ['thumbnail', 'name', 'during', 'session', 'room']

const ScheduleContainer = () => {
  const [dataTable, setData] = useState<any>([]);
  const [date, setFilter] = useState(new Date());
  const [cinema, setCinema] = useState('');

  const { data, loading } = useListSchedulesQuery({
    variables: {
      data: {
        date: formatDate(date),
        location: cinema || undefined,
      }
    }
  });

  useEffect(() => {
    const mapper = data?.ListSchedules.map((item) => ({
      id: item.id,
      name: item.movie?.name,
      subName: 'Queen Rambit',
      images: [`${item.movie?.thumbnail}`],
      session: formatTime(item.time),
      room: item.theater?.name,
      during: item.movie?.duration,
    }));

    setData(mapper);
  }, [data]);

  return (
    <>
      <div className='top-bar'>
        <div className="-intro-x breadcrumb mr-auto">
          Schedules
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="intro-y col-span-12 flex flex-wrap items-center mt-2 z-50">
          <Link href='/schedule/create'>
            <button className=" text-white bg-theme-100 shadow-md mr-2 px-5 py-2 rounded-md">Add New Schedule</button>
          </Link>

          <div className='ml-auto w-64 z-40'>
            <Select
              placeholder="Choose Cinema"
              options={ cinemaOptions }
              onChange={ (c) => {
                setCinema(c?.['value']);
              }
              }
            />
          </div>

          <div className='ml-10 rounded-l w-10 h-10 flex items-center justify-center bg-gray-100 border text-gray-600'>
            <Calendar className='w-4 h-4' />
          </div>
          <DatePicker
            className='input border ml-1 w-32 z-50 mr-10'
            selected={ date }
            onChange={ (date: any) => setFilter(date) }
          />

          {/* <div className="w-auto">
            <div className="w-56 relative text-gray-700">
              <input type="text" placeholder="Search..."
                className="input w-56 box pr-10 placeholder-theme-13" />
              <Search className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
            </div>
          </div> */}
        </div>

        <div className="intro-y col-span-12">
          <Table Cols={ cols } Data={ dataTable } type={ 'schedule' } />
        </div>
      </div>

      {
        loading && (
          <div className='absolute' style={ { top: 10, left: '50%' } }>
            <Loading />
          </div>
        )
      }
    </>
  );
};

export default ScheduleContainer;
