import React from 'react';

import GeneralReport from './generalReport';
import Chart from './chart';
import Transaction from './transaction';

const Dashboard = () => {

  return (
    <>
      <div className='top-bar mb-5'>
        <div className="-intro-x breadcrumb mr-auto">
          Dashboard
        </div>
      </div>



      <div className='grid grid-cols-4 gap-5'>

        {/* Left Side */}
        <div className='intro-x col-span-3 border-r border-theme-50 pr-5 mb-5'>
          {/* General Report */}
          <GeneralReport />

          {/* Chart */}
          <Chart />
        </div>

        {/* Right Side */}
        <div className='col-span-1 -intro-y'>
          <Transaction />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
