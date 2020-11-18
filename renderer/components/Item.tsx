import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';

import { VND } from 'helper/currency';
import { CartContext } from 'contexts/cart/cart.context';
import { useMutation } from '@apollo/client';
import { CHECK_PROMOTO } from 'helper/graphql/mutation/ticket';

type ItemProps = {
  item: any;
};

const Item: React.FC<ItemProps> = ({ item }) => {
  const { add, remove, tickets } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [isValidCoupon, setValid] = useState({
    status: false,
    newPrice: 0,
  });

  const [checkCoupon] = useMutation(CHECK_PROMOTO);

  useEffect(() => {
    checkCoupon({
      variables: {
        data: {
          id: item.id,
          code: encodeURIComponent(couponCode),
        },
      },
    }).then((data) => {
      if (data.data?.checkPromotion?.status) {
        Swal.fire({
          icon: 'success',
          title: 'Thành Công',
        });

        setValid({
          status: true,
          newPrice: data.data?.checkPromotion?.newPrice,
        });

        add(item, quantity, isValidCoupon.newPrice, couponCode);
      } else {
        setValid({
          status: false,
          newPrice: 0,
        });
      }
    });
  }, [couponCode]);

  useEffect(() => {
    if (!tickets.find((ticket) => ticket.item.id === item.id)) {
      setQuantity(0);
      setCouponCode('');
      setValid({
        status: false,
        newPrice: 0,
      });
    }
  }, [tickets]);

  useEffect(() => {
    if (quantity !== 0) {
      if (isValidCoupon.status) {
        add(item, quantity, isValidCoupon.newPrice, couponCode);
      } else {
        add(item, quantity);
      }
    } else {
      remove(item.id);
    }
  }, [quantity]);

  const decre = () => {
    setQuantity((prev) => {
      if (prev === 0) {
        return 0;
      }
      return prev - 1;
    });
  };

  const inputChange = (e: any) => {
    e.preventDefault();
    setQuantity(parseInt(e.target.value, 10));
  };

  const incre = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleCoupon = (e: any) => {
    e.preventDefault();
    setCouponCode(e.target.value);
  };

  return (
    <div className="intro-y block col-span-4">
      <div className='box rounded-md p-1 relative'>
        <div className='flex-none pos-image relative block h-16'>
          <div className="pos-image__preview image-fit">
            <img className=''
            alt="dalat tourist" src={item.banner} />
          </div>
        </div>
        <div className="block font-medium text-center mt-1 h-10 overflow-hidden">{ item.name }
        <div className='block font-medium text-center h-10 overflow-hidden'>Loại vé: {item.type === 0 ? 'Người Lớn' : 'Trẻ Em'}</div>
        </div>
        <div className='flex block font-bold text-red-600 text-center text-lg justify-center'>
          <div className={ `${isValidCoupon.status ? 'line-through' : ''}`}>
            {VND(item.price)}
          </div>
            {isValidCoupon.status && (
              <div className='ml-3'>{VND(isValidCoupon.newPrice)}</div>
            )}
          </div>
        <div className="flex w-full items-center">
          <input className="input w-full border text-center"
            value={ couponCode } onChange={ handleCoupon }
            type="text" placeholder='Coupon'/>
        </div>
        <div className="flex w-full my-1">
          <button onClick={decre}
            className="button w-16 border bg-theme-3 text-white mr-1">
            -
          </button>
          <input type="number" className="input w-full border text-center"
            placeholder="Item quantity" value={quantity}
            onChange={(e) => inputChange(e)} min={0} max={1000} />
          <button className="button w-16 border bg-theme-3 text-white ml-1"
            onClick={incre}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
