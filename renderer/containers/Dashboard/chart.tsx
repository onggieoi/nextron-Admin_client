import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { useChartQuery } from 'graphql/generated';

const Chart = () => {
  const { data } = useChartQuery();


  return (
    <div className='my-10 zoom-in p-5 mx-auto border-2 border-theme-50 rounded-lg'
      style={{ width: '1200px' }}>
      <div className='mb-5 text-lg'>Sales</div>
      <LineChart
        width={1150}
        height={1100}
        data={data?.chart}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tickCount={11} />
        <YAxis tickCount={10} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" name='Total sales' stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default Chart;
