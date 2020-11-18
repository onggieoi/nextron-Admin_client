import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import ListItems from 'components/ListItems';
import Loading from 'components/Loading';
import { CATEGORIES, TICKETS } from 'helper/graphql/query/ticket';

const Main: React.FC = () => {
  const [categoryID, setCategoryID] = useState('0');
  const [isShowCategories, setIsShow] = useState(true);

  const {
    data: categories, loading: categoriesLoading, error: errCategory, refetch: refecthCategory,
  } = useQuery(CATEGORIES);

  const {
    data: tickets, loading: DataLoading, error, refetch: refetchTickets,
  } = useQuery(TICKETS, {
    variables: { category: { id: categoryID } },
  });

  useEffect(() => {
    refecthCategory();
    refetchTickets();
  }, []);

  const handleFilter = (id: string) => {
    setCategoryID(id);
  };

  const classCurrentFilter = (id: string) => {
    if (id === categoryID) {
      return 'bg-theme-1 text-white';
    }
    return '';
  };

  const handleCollapse = () => {
    setIsShow(!isShowCategories);
  };

  const hide = () => {
    if (isShowCategories) {
      return {};
    }
    return {
      display: 'none',
    };
  };

  const Categories = () => <>
    <div className="grid grid-cols-12 gap-1 text-center" style={hide()}>
      {categories?.categories?.category && (
        categories?.categories?.category.length > 1 && (
          <div onClick={() => handleFilter('0')}
            className={`intro-y col-span-4 box p-2 cursor-pointer zoom-in ${classCurrentFilter('0')}`}>
            <div className="text-sm font-bold capitalize">All</div>
          </div>
        ))}
      {
        categoriesLoading && (
          <div className=' ml-24'>
            <Loading />
          </div>
        )
      }
      {
        errCategory && (
          <div className='text-red-600 col-span-4 p-2'>something wrong</div>
        )
      }
      {
        categories?.categories?.category && (
          categories?.categories?.category.length > 1 && categories.categories.category.map((item: any) => (
            <>
              <div onClick={() => handleFilter(item.id)} key={item.id}
                className={`intro-y col-span-4 box p-2 cursor-pointer zoom-in ${classCurrentFilter(item.id)}`}>
                <div className="font-bold text-sm uppercase truncate">
                  {item.name}
                </div>
              </div>
            </>
          )))
      }
    </div>
    {/* button Collapse */}
    { categories?.categories?.category && (
      categories?.categories?.category.length > 1 && (
        <div className='flex'>
          <button className='mx-auto p-1 my-1 text-sm'
            onClick={handleCollapse}>
            {isShowCategories ? 'Hide Playzone' : 'Show Playzone'}
          </button>
        </div>
      ))
    }
  </>;

  return (
    <>
      {/* category */}
      { Categories()}
      {/* List Items */}
      {
        DataLoading && (
          <div className='mt-20 ml-32'>
            <Loading />
          </div>
        )
      }
      {
        error && (
          <div className='text-red-600 mt-5'>something wrong</div>
        )
      }
      {
        tickets?.tickets?.products && (
          <ListItems data={tickets.tickets.products} fullSize={!isShowCategories} />
        )
      }
    </>
  );
};

export default Main;
