import Loading from 'components/Loading';
import { useTransactionsQuery } from 'graphql/generated';
import React, { useCallback, useState } from 'react';
import { RefreshCw } from 'react-feather';

const Transaction = () => {
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useTransactionsQuery();

  const reFresh = useCallback(() => {
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
      <div className={`${loading ? 'bg-theme-5 opacity-25' : ''} `}>
        <div className='flex items-center justify-center mb-5 px-5'>
          <div className='mr-auto text-lg'>Transactions</div>
          <button onClick={reFresh} className='ml-auto'><RefreshCw /></button>
        </div>
        {/* Cards */}
        {
          data?.transactions.map((item, index) => (
            <div key={index} className='-intro-y flex bg-theme-50 text-white py-5 mb-5
                justify-center items-center rounded-md shadow-md zoom-in'>
              {/* Info */}
              <div className='mr-auto ml-5'>
                <div className='text-xl font-bold max-w-xl'>{item.user}</div>
                <div>{new Date(item.date).toLocaleString()}</div>
                <div>From {item.location}</div>
              </div>
              {/* Money */}
              <div className='ml-auto mr-5 text-theme-9 font-bold text-2xl inline-block'>+ {item.price} $</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Transaction;