import React, { InputHTMLAttributes } from 'react';
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
    const image = await resizeFile(e.target.files[0]);

    setValue(image);
  }

  const handleRemove = () => {
    setValue('');
  }

  return (
    <div className='mb-3'>
      <label>{props.label}: </label>
      <input type="file" onChange={handleOnChange} multiple={false} formEncType='multipart/form-data' name={props.name} />
      {
        value && (
          <div className='p-5 my-3 overflow-hidden bg-gray-300 grid gap-3 grid-cols-12 mx-auto'
            style={{ maxWidth: '1000px', maxHeight: '500px' }}>
            <div className='col-span-4 relative'>
              <button onClick={handleRemove} type='button'
                className='absolute top-0 right-0 text-white'><X />
              </button>
              <img src={value} className='object-center w-full rounded-md' />
            </div>
          </div>
        )
      }
    </ div>
  );
};

export default FileUpload;
