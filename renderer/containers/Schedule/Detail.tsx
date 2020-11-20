import React, { useState } from 'react';

import { InitialFormSchedule } from 'interfaces';
import FormComponent from './Form';

type Props = {
  schedule: any
}

const DetailPage: React.FC<Props> = ({ schedule }) => {
  const { id, time, scheduleDate, theater, movie, location, price } = schedule;

  const [initValues] = useState({
    id, location,
    time: Number(time),
    date: scheduleDate.date,
    theater: theater.name,
    theaterId: theater.id,
    movieId: movie.id,
    movie: movie.name,
    price: price,
  } as InitialFormSchedule);

  return (
    <>
      <div className='top-bar'>
        <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
          Schedule
        </div>
      </div>

      <div className='p-5 mx-auto' style={{ width: '1500px' }}>
        <FormComponent initialForm={initValues} />
      </div>
    </>
  );
};

export default DetailPage;
