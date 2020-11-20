import React, { useCallback, useState } from 'react';
import { RefreshCw } from 'react-feather';

import { useGeneralReportQuery } from 'graphql/generated';

import { VND } from 'helper/functions';
import Loading from 'components/Loading';

const GeneralReport = () => {
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useGeneralReportQuery();

  const reFreshGR = useCallback(() => {
    setLoading(true);
    setTimeout(async () => {
      await refetch()
      setLoading(false);
    }, 1000)
  }, [refetch]);

  return (
    <div className='relative'>
      {
        loading && (
          <div className='absolute' style={{ top: '30%', left: '50%' }} >
            <Loading />
          </div>
        )
      }
      <div className={` ${loading ? 'bg-theme-5 opacity-25' : ''}`}>
        <div className='flex px-6 mb-5' >
          <div className=''>General Report</div>
          <button className='ml-auto' onClick={reFreshGR}>
            <RefreshCw />
          </button>
        </div>
        <div className='intro-x grid grid-cols-3 gap-10 px-5'>
          <div className='col-span-1 bg-theme-50 h-40 flex flex-col text-white
                justify-center items-center rounded-md shadow-md zoom-in'>
            <div className='text-lg'>TOTAL SALES</div>
            <div className=' text-3xl'>
              {VND(data?.generalReport.total || 0)}
            </div>
          </div>

          <div className='col-span-1 bg-theme-50 h-40 flex flex-col text-white
                justify-center items-center rounded-md shadow-md zoom-in'>
            <div className='text-lg'>TOTAL USERS</div>
            <div className=' text-3xl'>
              {data?.generalReport.users}
            </div>
          </div>

          <div className='col-span-1 bg-theme-50 h-40 flex flex-col text-white
                justify-center items-center rounded-md shadow-md zoom-in'>
            <div className='text-lg'>TOTAL MOVIES</div>
            <div className=' text-3xl'>
              {data?.generalReport.movies}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralReport;