import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LogOut } from 'react-feather';
import { useQuery } from '@apollo/client';

import { setLocalState } from 'helper/localStorage';
import { VND } from 'helper/currency';
import { AuthContext } from 'contexts/auth/auth.context';
import { AMOUNTONDAY } from 'helper/graphql/query/statistic';
import { CartContext } from 'contexts/cart/cart.context';

const SideMenu: React.FC = () => {
  const Router = useRouter();
  const { authState, authDispatch } = useContext(AuthContext);
  const { fetch } = useContext(CartContext);
  const [date] = useState(new Date());
  const [amount, setAmount] = useState({
    quantity: 0,
    total: 0,
  });

  const { data, error, refetch } = useQuery(AMOUNTONDAY, {
    variables: {
      data: {
        start: date,
        end: date,
      },
    },
  });

  useEffect(() => {
    if (fetch) {
      refetch();
    }
  }, [fetch]);

  useEffect(() => {
    if (!error) {
      let total = 0;
      data?.orderStatistic?.orderStatistic?.forEach((item) => {
        total += item.orders_ticket_paid_price;
      });
      setAmount({ quantity: data?.orderStatistic?.orderStatistic?.length, total });
    }
  }, [data]);

  const logout = () => {
    authDispatch({ type: 'SIGN_OUT' });
    setLocalState('auth', '');
    Router.push('/login');
  };

  const activeClass = (page: string) => {
    if (page === Router.pathname) {
      return 'side-menu--active';
    }
    return '';
  };

  return (
    <nav className={'side-nav relative'}
    // style={{ height: '95vh' }}
    >
      <a className="flex items-center cursor-pointer flex-col" style={{ width: '4%', float: 'left' }}>
        <img alt="Dalattourist" src='/logo_dalat_sm.png' style={{ width: '100%' }} />
      </a>

      <ul>
        <li className='cursor-pointer'>
          <Link href='/'>
            <div className={`side-menu ${activeClass('/')}`}>
              <div className="side-menu__title"> Bán Tạo Vé </div>
            </div>
          </Link>
        </li>
        <li className=' cursor-pointer'>
          <Link href='/check'>
            <div className={`side-menu ${activeClass('/check')}`}>
              <div className="side-menu__title"> Kiểm Tra Vé </div>
            </div>
          </Link>
        </li>
        <li className=' cursor-pointer'>
          <Link href='/statistic'>
            <div className={`side-menu ${activeClass('/statistic')}`}>
              <div className="side-menu__title"> Thống Kê </div>
            </div>
          </Link>
        </li>
        {/* <li className='cursor-pointer'>
          <Link href='/printfirst'>
            <div className={ `side-menu ${activeClass('/printfirst')}` }>
              <div className="side-menu__title"> Print First </div>
            </div>
          </Link>
        </li> */}
      </ul>

      {/* Log out */}
      <div className='flex-col float-right'>
        <button onClick={logout}>
          <div className='side-menu'>
            <div className="side-menu__icon"> <LogOut /> </div>
          </div>
        </button>
      </div>

      <div className='flex-col text-white text-center border rounded-md border-theme-3 mr-2 shadow-lg break-words pr-1 pl-1'
        style={{ width: '15%', float: 'right' }} >
        <p>{authState?.user?.name}</p>
        <p className='text-xs truncate'>{authState?.user?.agency}</p>
      </div>
      <div className='flex-col float-right pr-2 font-bold'>
        <p className='text-white'>Tổng tiền: {VND(amount.total || 0)}</p>
        <p className='text-white'>Vé đã bán: {amount.quantity || 0}</p>
      </div>
    </nav >
  );
};

export default SideMenu;
