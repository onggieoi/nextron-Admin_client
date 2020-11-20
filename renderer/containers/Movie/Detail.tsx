import React, { useEffect, useState } from 'react';

import { GenreOptions, CountryOptions } from 'helper/constant';
import { InitialFormMovie } from 'interfaces';
import FormComponent from './Form';

type Props = {
  movie: any;
}

const DetailPage: React.FC<Props> = ({ movie }) => {
  const {
    isShow, id, name, description, type, director, producer, country, thumbnail, images, duration
  } = movie;

  const [initValues] = useState({
    isShow, id, name, description, director, producer, duration,
    type: type.split(',').map((type) => GenreOptions.find((genre) => genre.value === type)),
    country: CountryOptions.find((item) => (item.value === country)),
    thumbnail: thumbnail,
    images: images?.map(({ url }) => (url)),
  } as InitialFormMovie);

  return (
    <>
      <div className='top-bar'>
        <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
          Movies
        </div>
      </div>

      <div className='intro-x p-5 mx-auto' style={ { maxWidth: '1000px' } }>
        <FormComponent initialForm={ initValues } />
      </div>
    </>
  );
};

export default DetailPage;
