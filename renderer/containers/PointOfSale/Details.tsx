import React, { useContext } from 'react';
import {
  Users,
  User,
  MapPin,
  Mail,
  Phone,
} from 'react-feather';

import { CartContext } from 'contexts/cart/cart.context';
import { typeNewOrder } from 'helper/constant';

const Details = () => {
  const { details, setDetails, setType } = useContext(CartContext);

  const isChecked = (filedRadio: string) => {
    if (details.typeTicket === filedRadio) {
      return true;
    }
    return false;
  };

  const handleChange = (field: string, e: any) => {
    setType(typeNewOrder);
    setDetails({
      ...details,
      [field]: e.target.value,
    });
  };

  const handleRadio = (field: string) => {
    setDetails({
      ...details,
      typeTicket: field,
    });
  };

  return (
      <div className="box p-5 mt-1">
        {/* Type Ticket */}
        <div className="flex items-center mb-2 pb-1">
          <div className='w-full flex items-center'>

            <div className="flex items-center text-gray-700 ml-auto w-1/2 px-2">
              <i className="w-4 h-4 text-gray-600 mr-3">
                <User />
              </i>
              <input onChange={() => handleRadio('single') } checked={isChecked('single')}
                name='typeTicket' type="radio" id='single' className="input border mr-2" />
              <label className="cursor-pointer select-none" htmlFor='single'>Đơn</label>
            </div>

            <div className="flex items-center text-gray-700 w-1/2 px-2">
              <i className="w-4 h-4 text-gray-600 mr-3">
                <Users />
              </i>
              <input onChange={() => handleRadio('group')} checked={isChecked('group')}
                name='typeTicket' type="radio" id='group' className="input border mr-2" />
              <label className="cursor-pointer select-none" htmlFor='group'>Nhóm</label>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className='flex items-center border-b pb-1 mb-2'>
          <div className='w-11/12'>
            <div className="text-gray-600">
              {
                details.typeTicket === 'single' ? 'Họ và Tên' : 'Tên Đại Diện'
              }
            </div>
          <input type="text" value={ details.name } onChange={(e) => handleChange('name', e)}
              className='w-full font-bold outline-none' />
          </div>
          <i className="w-4 h-4 text-gray-600 ml-auto">
          {
            details.typeTicket === 'single' ? <User /> : <Users />
          }
          </i>
        </div>

        {/* Address */}
        <div className='flex items-center border-b pb-1 mb-2'>
          <div className='w-11/12'>
            <div className="text-gray-600">Địa Chỉ</div>
            <input type="text" value={ details.address } onChange={ (e) => handleChange('address', e) }
              className='w-full font-bold outline-none' />
          </div>
          <i className="w-4 h-4 text-gray-600 ml-auto">
            <MapPin />
          </i>
        </div>

        {/* Email */}
        <div className='flex items-center border-b pb-1 mb-2'>
          <div className='w-11/12'>
            <div className="text-gray-600">Email</div>
            <input type="text" value={ details.email } onChange={ (e) => handleChange('email', e) }
              className='w-full font-bold outline-none' />
          </div>
          <i className="w-4 h-4 text-gray-600 ml-auto">
            <Mail />
          </i>
        </div>

        {/* Phone number */}
        <div className='flex items-center border-b pb-1 mb-2'>
          <div className='w-11/12'>
            <div className="text-gray-600">Số Điện Thoại</div>
            <input type="text" value={ details.phone } onChange={ (e) => handleChange('phone', e) }
            className='w-full font-bold outline-none' />
          </div>
          <i className="w-4 h-4 text-gray-600 ml-auto">
            <Phone />
          </i>
        </div>

      </div>
  );
};

export default Details;
