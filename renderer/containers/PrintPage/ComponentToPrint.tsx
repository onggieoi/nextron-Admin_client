import React, { useContext } from 'react';
import QRcode from 'qrcode.react';
import moment from 'moment';

import { CartContext } from 'contexts/cart/cart.context';
import { VND } from 'helper/currency';
import { AuthContext } from 'contexts/auth/auth.context';

const ComponentToPrint = () => {
  const { ticketsOrder } = useContext(CartContext);
  const { authState } = useContext(AuthContext);

  const getSerial = (serial: string) => {
    const number: any = serial.split('.');
    const lastNumber = number[number.length - 1];
    let newSerial = '';
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < (8 - lastNumber.length); index++) {
      newSerial += '0';
    }
    newSerial += lastNumber;
    return <>{newSerial}</>;
  };

  return (
    <div className='m-0 p-0'>
      {
        ticketsOrder && ticketsOrder.map((ticket) => (
          <>
            <div key={ticket?.ticketInfo?.ticketCode}
              className='flex bg-white w-screen text-black font-bold' style={{ fontSize: '0.4rem' }}>

              <img alt="Dalattourist" src="/logo_dalat_sm.png" className="w-16" style={{ width: '20%' }}></img>
              <div className='text-left' style={{ width: '80%' }}>
                <div className='text-xs'>KHU DU LỊCH THÁC DATANLA</div>
                <div style={{ fontSize: '.7rem' }}>Địa chỉ: QL20 Đèo Prenn, P.3, Tp. Đà Lạt, Lâm Đồng</div>
                {/* <div className='mb-1'>Điện thoại: 0263 3533 899</div> */}

              </div>
            </div>
            <div className='border-dashed border-black border w-full my-2'></div>
            <div className="w-full font-bold text-black text-center my-2" style={{ width: '100%' }}>{ticket.name}</div>
            <div className='flex w-screen'>
              <div className='text-left font-bold text-black' style={{ width: '60%' }}>
                <div>Số Serial: { getSerial(ticket.ticketInfo.ticketSerial)}</div>
                <div>Giá vé: {VND(ticket.price)}</div>
                <div>Loại vé: { ticket.ticketInfo.productTicketType === 0 ? 'Người lớn' : 'Trẻ em'} </div>
                {
                  ticket.ticketInfo.productTicketType === 1 && (
                    <img src="/kidSymbol.jpeg" alt="icon-kid" style={{ maxWidth: '50px', marginLeft: '5px' }}/>
                  )
                }
                {
                  ticket?.isRepresent && (
                    <div>Số lượng vé: {ticket.ticketCount}</div>
                  )
                }
              </div>
              <div className='text-left' style={{ width: '40%' }}>
                <QRcode
                  bgColor={'#ffffff'}
                  fgColor={'#000000'}
                  renderAs={'svg'}
                  size={80}
                  value={ ticket.ticketInfo.ticketCode} />
                <div className='mt-1 font-bold text-black'>{ ticket.ticketInfo.ticketCode}</div>
              </div>
            </div>
            <div className='border-dashed border-black border w-full my-2'></div>
            <footer className='text-xs text-black' style={{ fontSize: '0.6rem' }}>
              <div>Tên Nhân Viên: <b>{authState?.user?.name}</b></div>
              <div>Liên hệ số: <b>(026)3 3533 899</b> để nhận hoá đơn</div>
              <div className="font-bold">Lưu ý: Vé chỉ có giá trị sử dụng trong ngày sử dụng <br /> {moment().format('DD-MM-YYYY H:m:s')} </div>
            </footer>
          </>
        ))
      }
    </div>
  );
};

export default ComponentToPrint;
