import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import {
  Search,
  ChevronsLeft,
  ChevronsRight,
} from 'react-feather';
import { useQuery } from '@apollo/client';

import Table from 'containers/Statistic/Table';
import { STATISTIC } from 'helper/graphql/query/statistic';
import Loading from 'components/Loading';
import { TableItem } from 'interfaces';
import { VND } from 'helper/currency';
import { epExportExcel } from 'helper/epExportExcel';
import { getLocalState } from 'helper/localStorage';

const pageNumber = 10;

const StatisticPage = () => {
  const [filter, setFilter] = useState({
    query: '',
    start: new Date(),
    end: new Date(),
  });

  const {
    data, loading, error, refetch,
  } = useQuery(STATISTIC, {
    variables: {
      data: {
        search: encodeURIComponent(filter.query),
        start: `${filter.start.getDate()}-${filter.start.getMonth() + 1}-${filter.start.getFullYear()}`,
        end: `${filter.end.getDate()}-${filter.end.getMonth() + 1}-${filter.end.getFullYear()}`,
      },
    },
  });

  useEffect(() => {
    if (!loading && !error) refetch();
  }, [data]);

  const [items, setItems] = useState([] as TableItem[]);
  const [dataTable, setDataTable] = useState([] as TableItem[]);
  const [paging, setPaging] = useState({
    pages: 0,
    currentPage: 0,
  });
  const [pagesView, setPagesView] = useState([1]);
  const [amount, setAmount] = useState({
    total: 0,
    quantity: 0,
    totalCancle: 0,
    quantityCancle: 0,
  });

  useEffect(() => {
    if (!loading && !error) {
      setItems(data?.orderStatistic?.orderStatistic);

      setPaging({
        pages: Math.ceil(data?.orderStatistic?.orderStatistic?.length / pageNumber) ?? 0,
        currentPage: 1,
      });

      setDataTable(data?.orderStatistic?.orderStatistic?.slice((paging.currentPage - 1) * pageNumber, (paging.currentPage * pageNumber)));

      let total = 0;
      let totalCancle = 0;
      let quantityCancle = 0;
      data?.orderStatistic?.orderStatistic?.forEach((item) => {
        total += item.orders_ticket_paid_price;
        if (item.orders_ticket_is_cancelled !== 1) {
          quantityCancle += 1;
          totalCancle += item.orders_ticket_paid_price;
        }
      });
      setAmount({
        quantity: data?.orderStatistic?.orderStatistic?.length, total, totalCancle, quantityCancle,
      });
    }
  }, [data]);

  useEffect(() => {
    const { currentPage, pages } = paging;
    setDataTable(items?.slice((currentPage - 1) * pageNumber, (currentPage * pageNumber)));

    const arr = [] as any;
    for (let i = currentPage - 5; i < currentPage + 6; i += 1) {
      if (i > 0 && i < pages + 1) {
        arr.push(i);
      }
    }
    setPagesView(arr);
  }, [paging]);

  const searchOrderNumber = (e: any) => {
    setFilter({ ...filter, query: e.target.value });
  };

  const handlePage = (i: number) => {
    setPaging({
      ...paging,
      currentPage: i,
    });
  };

  const activePageStyle = (page: number) => {
    if (page === paging.currentPage) {
      return 'pagination__link--active';
    }
    return '';
  };

  const handleExportExcel = () => {
    const { query, start, end } = filter;
    const id = getLocalState('auth')?.id;

    window.open(epExportExcel(id, query, start, end), '_blank');
  };

  return (
    <>
      <div className="grid grid-cols-12">
        {/* Header */}
        <div className="intro-y col-span-12 flex items-center justify-center my-3 ml-5">
          <div className='mr-auto'>
            <div>Vé Đã Bán: <span className='font-bold text-red-600'>{ amount.quantity }</span></div>
            <div>Tổng Tiền: <span className='font-bold text-red-600'>{VND(amount.total)}</span></div>
          </div>

          <div className='mx-auto'>
            <div>Vé Đã Huỷ: <span className='font-bold text-red-600'>{ amount.quantityCancle }</span></div>
            <div>Tổng Tiền: <span className='font-bold text-red-600'>{ VND(amount.totalCancle) }</span></div>
          </div>

          {/* Query */}
          <div className="flex items-center justify-center ml-auto mr-5">
            <DatePicker
              className='input border mx-3 w-32 shadow-lg'
              dateFormat='dd/MM/yyyy'
              selected={ filter.start }
              onChange={ (date: any) => setFilter({ ...filter, start: date }) }
              selectsStart
              startDate={ filter.start }
              endDate={ filter.end }
            />
            <DatePicker
              className='input border w-32 mr-2 shadow-lg'
              dateFormat='dd/MM/yyyy'
              selected={ filter.end }
              onChange={ (date: any) => setFilter({ ...filter, end: date }) }
              selectsEnd
              startDate={ filter.start }
              endDate={ filter.end }
              minDate={ filter.start }
            />

            <div className="w-56 relative text-gray-700">
              <input onChange={ searchOrderNumber } value={ filter.query }
                type="text" placeholder="Mã Đơn Hàng / Mã vé / Tên " autoFocus
                className="input w-full box pr-10 placeholder-theme-13" />
              <Search className='w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0'></Search>
            </div>
          </div>
        </div>
        <div className='col-span-12 ml-auto'>
          <button onClick={handleExportExcel}
           className='border-2 border-theme-3 py-2 w-32'>Xuất Excel</button>
        </div>

        <Table Data={dataTable} />
        { loading && (<Loading />)}
        {error && <div className='text-red-600 ml-64 w-64'>something went wrong</div>}

        {/* Paging */}
        {
          paging.pages !== 0 && (
            <div className="intro-y col-span-12 flex flex-wrap items-center mt-2 xl:mt-5">
              <ul className="pagination mx-auto">
                {
                  paging.currentPage !== 1 && (
                    <li>
                      <button onClick={() => handlePage(1)}
                        className="pagination__link cursor-pointer">
                        <ChevronsLeft className="w-4 h-4" />
                      </button>
                    </li>
                  )
                }
                {
                  pagesView.map((page) => (
                    <li key={page}>
                      <button onClick={() => handlePage(page)}
                        className={`pagination__link cursor-pointer ${activePageStyle(page)}`}>
                        {page}
                      </button>
                    </li>
                  ))
                }
                {
                  paging.currentPage !== paging.pages && (
                    <li>
                      <button onClick={() => handlePage(paging.pages)}
                        className="pagination__link cursor-pointer">
                        <ChevronsRight className="w-4 h-4" />
                      </button>
                    </li>
                  )
                }
              </ul>
            </div>
          )
        }
      </div>
    </>
  );
};

export default StatisticPage;
