import React, { useContext } from 'react';
import { Trash } from 'react-feather';

import { VND } from 'helper/currency';
import { CartContext } from 'contexts/cart/cart.context';

const Ticket = ({ ticket, onErr }: any) => {
  const { remove } = useContext(CartContext);

  const handleOnErrStyle = () => {
    if (onErr) return 'text-red-600';
    return '';
  };

  const styleCoupon = () => {
    if (ticket.coupon) return ' line-through';
    return '';
  };

  return (
    <>
      <div className="w-full p-1 cursor-pointer transition mb-1
        duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md shadow-md">
        <div className='flex items-center justify-center'>
          <button onClick={() => remove(ticket.item.id)} className='p-1 rounded-md shadow-md mr-1'>
            <Trash className=' text-red-600'/>
          </button>
          <div className='flex flex-col w-full'>
            <div className='flex'>
              <div className={ `truncate mr-1 max-w-3/4 ${handleOnErrStyle()}`}>{ticket.item.name}</div>
              <div className="text-gray-600">x {ticket.quantity}</div>
            </div>
            <div className=''>Loại vé: { ticket.item.type === 0 ? 'Người Lớn' : 'Trẻ Em' }</div>
            {
              ticket.coupon && (
                <div className=' mr-auto'>Coupon:  <span className='text-red-600 font-bold'>{ ticket.coupon }</span></div>
              )
            }
            </div>

            <div className='ml-auto'>
              <div className={`${styleCoupon()}`}>{VND(ticket.item.price * ticket.quantity)}</div>
              {
                ticket.coupon && (
                  <div className='flex'>
                    <div className='ml-auto'> <span className='text-red-600 font-bold'>{ VND(ticket.total) }</span></div>
                  </div>
                )
              }
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
