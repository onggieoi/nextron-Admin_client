import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { NotificationManager } from 'react-notifications';
import { DollarSign } from 'react-feather';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { InitialFormSchedule, DataType } from 'interfaces';
import { cinemaOptions } from 'helper/constant';
import { formatDate, formatTime } from 'helper/functions';

import { useCreateScheduleMutation, useListSchedulesQuery, useMoviesOptionQuery, useTheaterOptionsQuery } from 'graphql/generated';

type Props = {
  initialForm?: InitialFormSchedule;
}

const FormComponent: React.FC<Props> = ({ initialForm }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [date, setDate] = useState(() => {
    if (initialForm?.theater) {
      return new Date(initialForm?.date);
    }
    return new Date();
  });

  const [time, setTime] = useState(() => {
    if (initialForm?.time) {
      return new Date(initialForm?.time);
    }
    return new Date();
  });

  const [cinema, setCinema] = useState(() => {
    if (initialForm?.location) {
      return cinemaOptions.find((cinema) => cinema.value === initialForm.location)
    }
    return {} as DataType;
  });

  const [theater, setTheater] = useState(() => {
    if (initialForm?.theater) {
      return {
        label: initialForm.theater,
        value: initialForm.theaterId,
      }
    }
    return {} as DataType;
  });

  const [movie, setMovie] = useState(() => {
    if (initialForm?.movie) {
      return {
        label: initialForm.movie,
        value: initialForm.movieId,
      }
    }
    return {} as DataType;
  });

  const [price, setPrice] = useState(initialForm?.price || 0);

  const { data } = useMoviesOptionQuery();
  const { data: theaters } = useTheaterOptionsQuery({
    variables: {
      location: cinema?.value || ''
    }
  });
  const { data: sessions } = useListSchedulesQuery({
    variables: {
      data: {
        date: formatDate(date),
        location: cinema?.value || '',
      }
    }
  });

  const [createSchedule] = useCreateScheduleMutation();

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      createSchedule({
        variables: {
          data: {
            id: initialForm?.id,
            date: formatDate(date),
            location: cinema?.value || 'hochiminh',
            time: time.getTime().toString(),
            price,
            movieId: Number(movie.value),
            theaterId: Number(theater.value),
          }
        }
      }).then(({ data }) => {
        if (data?.createSchedule) {
          NotificationManager.success(
            initialForm?.id ? `Updated Successfull ${initialForm.id}` : 'Created movie',
            initialForm?.id ? `Update Successfull ${initialForm.id}` : 'Create Successfull',
            2000,
          );
          router.push('/schedule');
        } else {
          NotificationManager.error(
            `Something went wrong!!!`,
            'Create failed',
            2000,
          );
        }
      });
      setLoading(false);
    }, 1000);
  }

  return (
    <div className='grid grid-cols-2 gap-10'>
      <div className='intro-x flex flex-col col-span-1 w-full border border-theme-50 rounded-md shadow-lg p-5' >
        {/* Date */}
        <div className='intro-x flex items-center justify-center' style={{ zIndex: 100 }}>
          <div className='text-left font-bold text-lg w-24'>Date: </div>
          <DatePicker
            className='input border w-64 z-50 text-center'
            dateFormat='dd/MM/yyyy'
            selected={date}
            onChange={(date: Date) => setDate(date)}
            minDate={new Date()}
          />
        </div>

        {/* Cinema */}
        <div className='flex items-center justify-center mt-5'>
          <div className='text-left font-bold text-lg w-24'>Cinema: </div>
          <Select
            value={cinema}
            className='w-64'
            placeholder="Choose Cinema"
            options={cinemaOptions}
            onChange={(c: any) => setCinema(c)}
          />
        </div>

        {/* Theater */}
        <div className='flex items-center justify-center mt-5'>
          <div className='text-left font-bold text-lg w-24'>Theater: </div>
          <Select
            value={theater}
            placeholder="Choose Theater"
            className='w-64'
            options={theaters?.theaterOptions.map((item) => ({ label: item.name, value: item.id }))}
            onChange={(c: any) => setTheater(c)}
          />
        </div>

        {/* Movie */}
        <div className='flex items-center justify-center mt-5'>
          <div className='text-left font-bold text-lg w-24'>Movie: </div>
          <Select
            value={movie}
            className='w-64'
            placeholder="Choose Movie"
            options={data?.moviesOption.map((item) => ({ label: item.name, value: item.id }))}
            onChange={(c: any) => setMovie(c)}
          />
        </div>

        {/* Date */}
        <div className='flex items-center justify-center mt-5'>
          <div className='text-left font-bold text-lg w-24'>Time: </div>
          <DatePicker
            className='input border w-64 z-50 text-center'
            selected={time}
            onChange={(date: Date) => setTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>

        {/* Price */}
        <div className='flex items-center justify-center mt-5'>
          <div className='text-left font-bold text-lg w-24'>Price: </div>
          <input className='input w-64 border mt-2 text-center' type='number' value={price}
            onChange={(e) => setPrice(Number(e.target.value))} />
          <div className='-ml-6 mt-1'>
            <DollarSign />

          </div>
        </div>

        <div className='mx-auto' style={{ width: '24rem' }}>
          <button onClick={handleSubmit}
            className="button inline-block bg-theme-100 text-white py-3 px-5 mt-5 rounded-md shadow-lg font-bold w-full">
            Submit
          {loading && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
          </button>
        </div>
      </div>
      {
        sessions?.ListSchedules.length ? (
          <div className='col-span-1 flex-col flex gap-5 border border-theme-50 rounded-md shadow-lg p-5'>
            <div className='intro-y'>Already schedules</div>
            {
              sessions?.ListSchedules.map(({ time, id, movie, theater }) => (
                <Link key={id} href={`/schedule/${id}`}>
                  <div className='intro-y w-full bg-theme-100 py-5 text-center text-white 
                    font-bold text-lg rounded-md shadow-xl cursor-pointer'>
                    <div className='text-2xl'>Time: {formatTime(time)}</div>
                    <div>Theater: {theater?.name}</div>
                    <div>Movie: {movie?.name}</div>
                  </div>
                </Link>
              ))
            }
          </div>
        ) : null
      }
    </div>
  );
};

export default FormComponent;
