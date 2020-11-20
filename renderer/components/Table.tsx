import React from 'react';

import { TableItem } from 'interfaces';
import { CheckSquare, Trash2 } from 'react-feather';
import Link from 'next/link';

interface Props {
  type: string;
  Data: TableItem[];
  Cols: string[];
  deleteFn?: Function;
}

const Table: React.FC<Props> = ({ Cols, Data, type, deleteFn }) => {
  const ActiveClass = (status: boolean) => {
    if (status) {
      return 'text-theme-9';
    }
    return 'text-theme-6';
  };

  return (
    <table className="table table-report">
      <thead>
        <tr>
          {
            Cols.map((col, index) => (
              <th key={ index } className="whitespace-no-wrap uppercase text-center text-lg">{ col }</th>
            ))
          }
          <th className="whitespace-no-wrap uppercase text-center">actions</th>
        </tr>
      </thead>
      <tbody>
        {
          Data ? Data.map((item) => (
            <tr className="intro-x" key={ item.id }>
              <td>
                <div className="flex pl-5 justify-center">
                  {
                    item.images.map((img, index) => (
                      <div key={ index } className="w-10 h-10 image-fit zoom-in -ml-5">
                        <img className="tooltip rounded-full h-full object-cover" src={ `${img || '/preview-4.jpg'}` } />
                      </div>
                    ))
                  }
                </div>
              </td>
              <td className='text-center'>
                <Link href={ `${type}/${item.id}` }>
                  <div className="font-medium whitespace-no-wrap cursor-pointer">{ item.name }</div>
                </Link>
                <div className="text-gray-600 text-xs whitespace-no-wrap">{ item.subName }</div>
              </td>
              <td className="text-center">{ item.during }</td>
              {
                typeof item.status === 'boolean' && (
                  <td>
                    <div className={ `flex items-center justify-center ${ActiveClass(item.status)}` }>
                      <CheckSquare />{ item.status ? 'Showing' : 'Comming Soon' }
                    </div>
                  </td>
                )
              }
              {
                item.session && (
                  <td className='text-center'>
                    <div className="font-bold whitespace-no-wrap">{ item.session }</div>
                  </td>
                )
              }
              {
                item.room && (
                  <td className='text-center'>
                    <div className="font-bold whitespace-no-wrap">{ item.room }</div>
                  </td>
                )
              }
              <td className="table-report__action w-56">
                <div className="flex items-center justify-center">
                  <Link href={ `${type}/${item.id}` }>
                    <button className="flex items-center mr-3">
                      <CheckSquare />Edit
                    </button>
                  </Link>

                  {
                    deleteFn && (
                      <button onClick={ () => deleteFn(item.id) }
                        className="flex items-center text-theme-6">
                        <Trash2 />Delete
                      </button>
                    ) }
                </div>
              </td>
            </tr>
          )) : (
              <div className='absolute w-screen text-center text-red-600'>Data table is empty</div>
            )
        }
      </tbody>
    </table >
  );
};

export default Table;
