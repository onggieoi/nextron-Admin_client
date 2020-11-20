import React, { InputHTMLAttributes, useEffect } from 'react';
import { useField } from 'formik';
import { X } from 'react-feather';

import { resizeFile } from 'helper/functions';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const FileUpload: React.FC<Props> = (props) => {
  const [, { value }, { setValue }] = useField(props);

  const handleOnChange = async (e) => {
    e.preventDefault();
    const files = e.target.files;

    for (let i = 0; i < files?.length; i++) {
      const image = await resizeFile(files[i]);
      value.push(image);
    }
    setValue([...new Set(value)]);
  }

  const handleRemove = (url: string) => {
    setValue(value.filter((img) => img !== url));
  }

  return (
    <div className='mb-3'>
      <label>{props.label}: </label>
      <input type="file" onChange={handleOnChange} multiple={true} formEncType='multipart/form-data' name={props.name} />
      {
        value?.length > 0 && (
          <div className='p-5 my-3 overflow-hidden bg-gray-300 grid gap-3 grid-cols-12 mx-auto' style={{ maxWidth: '1000px', maxHeight: '500px' }}>
            {
              value.map((img, index) => (
                <div key={index} className='col-span-4 relative'>
                  <button onClick={() => handleRemove(img)} type='button'
                    className='absolute top-0 right-0 text-white'><X />
                  </button>
                  <img src={img} className='object-center w-full rounded-md' />
                </div>
              ))
            }
          </div>
        )
      }
    </ div>
  );
};

export default FileUpload;
