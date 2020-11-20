import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LogOut,
  Activity,
  Film,
  Trello
} from 'react-feather';

import { AuthContext } from 'contexts/Auth';

const SideMenu: React.FC = () => {
  const Router = useRouter();
  const { logout, isAuth } = useContext(AuthContext);

  const activeClass = (page: string) => {
    if (page === Router.pathname) {
      return 'side-menu--active';
    }
    return '';
  };

  return (
    <nav className='side-nav h-full relative' style={ { height: '95vh' } }>
      <Link href='/'>
        <div className=" flex-col items-center cursor-pointer" >
          <img alt="unknown" className='w-full' src="/logo.png" />
          <p className='text-center text-theme-200 font-bold text-lg'>Adminstrator Dashboard</p>
        </div>
      </Link>

      <div className='side-nav__devider my-6'></div>

      <ul>
        <li className='cursor-pointer'>
          <Link href='/'>
            <div className={ `side-menu ${activeClass('/')}` }>
              <div className="side-menu__icon"> <Activity /> </div>
              <div className="side-menu__title"> Dashboard </div>
            </div>
          </Link>
        </li>
        <li className='cursor-pointer'>
          <Link href='/movie'>
            <div className={ `side-menu ${activeClass('/movie')}` }>
              <div className="side-menu__icon"> <Film /> </div>
              <div className="side-menu__title"> Movies </div>
            </div>
          </Link>
        </li>
        <li className='cursor-pointer'>
          <Link href='/schedule'>
            <div className={ `side-menu ${activeClass('/schedule')}` }>
              <div className="side-menu__icon"> <Trello /> </div>
              <div className="side-menu__title"> Schedules </div>
            </div>
          </Link>
        </li>
      </ul>

      {/* bottom bar */ }
      <div className='absolute bottom-0 w-11/12'>

        <div className='side-nav__devider_white my-6'></div>

        {
          isAuth ? (
            <button onClick={ async () => await logout() } className='focus:outline-none'>
              <div className='side-menu'>
                <div className="side-menu__icon">
                  <LogOut />
                </div>
                <div className="side-menu__title"> Logout </div>
              </div>
            </button>
          ) : null
        }

      </div>
    </nav >
  );
};

export default SideMenu;
