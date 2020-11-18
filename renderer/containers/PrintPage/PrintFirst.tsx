import React, { useContext } from 'react';
import QRcode from 'qrcode.react';

import { CartContext } from 'contexts/cart/cart.context';

const PrintFirst = () => {
  const { printFirst } = useContext(CartContext);
  const {
    price, date, value, agencyName, agency,
  } = printFirst;
  return (
    <div className='m-0 p-0'>
      <div className='bg-white w-screen text-black font-bold' style={ { fontSize: '0.4rem' } }>
        <div className='text-center'>
          <div className='text-base'>KHU DU LỊCH THÁC DATANLA</div>
          <div className='mb-1'>Địa chỉ: QL20 Đèo Prenn, P.3, Tp. Đà Lạt, Lâm Đồng</div>
          <div>Ngày Sử Dụng: { date }</div>
          <div>Giá: { `${price} VND` }</div>
          <div>Nhân viên: { agencyName }</div>
          <div>Agency: { agency }</div>

          <div className='flex'>
            <div className='mx-auto'>
              <QRcode
                bgColor={ '#ffffff' }
                fgColor={ '#000000' }
                renderAs={ 'svg' }
                size={ 172 }
                value={ value || '' } />
            </div>
          </div>
          <div className='mt-1 text-center'>{ value }</div>
        </div>

        <div className='border-dashed border-black border w-full mt-5'></div>

        <footer className='mt-1' style={{ fontSize: '0.4rem' }}>
          <div>Tên Nhân Viên: { agencyName }</div>
          <div>Quý khách vui lòng liên hệ số (026)3 3533 899 để nhận hoá đơn</div>
          <div>Lưu ý vé chỉ có giá trị sử dụng trong ngày sử dụng</div>
        </footer>
      </div>
    </div>
  );
};

export default PrintFirst;
