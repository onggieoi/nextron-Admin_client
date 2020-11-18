import React, { useContext, useRef } from 'react';
import { Printer } from 'react-feather';
import { useReactToPrint } from 'react-to-print';

import { TableItem } from 'interfaces';
import { VND } from 'helper/currency';
import ComponentToPrint from 'containers/PrintPage/rePrint';
import { CartContext } from 'contexts/cart/cart.context';

class PrintPage extends React.Component {
  render() {
    return (
      <ComponentToPrint />
    );
  }
}

interface Props {
  Data: TableItem[];
}

const Table: React.FC<Props> = ({ Data }) => {
  const { rePrintHandle } = useContext(CartContext);
  const componentRef = useRef<any>();

  const print = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Ticket',
  });

  const handlePrint = (item: TableItem) => {
    rePrintHandle({
      name: item.product_name,
      type: item.product_ticket_type,
      price: item.orders_ticket_paid_price,
      serial: item.orders_ticket_serial,
      code: item.orders_ticket_code,
    });

    setTimeout(() => {
      print!();
    }, 500);
  };

  const ActiveClass = (isCancelled: number) => {
    if (isCancelled === 1) {
      return 'text-theme-9';
    }
    return 'text-theme-6';
  };

  return (
    <>
      <div className="intro-y col-span-12">
        <table className="table table-report">
          <thead>
            <tr>
              <th className="text-center whitespace-no-wrap">Mã Đơn Hàng</th>
              <th className="text-center whitespace-no-wrap">Mã Vé</th>
              <th className="text-center whitespace-no-wrap">Tên Vé</th>
              <th className="text-center whitespace-no-wrap">Giá Bán</th>
              <th className="text-center whitespace-no-wrap">Ngày Tạo</th>
              <th className="text-center whitespace-no-wrap">Trạng Thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              Data && Data.map((item: TableItem) => (
                <tr key={item.orders_ticket_code} className="intro-x box my-3">
                  <td className='w-16'>
                    {item.orders_number}
                  </td>
                  <td className='w-16'>
                    {item.orders_ticket_code}
                  </td>
                  <td className='h-10 truncate'>
                    {item.product_name}
                  </td>
                  <td className='w-16'>
                    {VND(item.orders_ticket_paid_price)}
                  </td>
                  <td className='w-48'>
                    {item.orders_created_at}
                  </td>
                  <td className={`w-25 ${ActiveClass(item.orders_ticket_is_cancelled)}`}>
                    {item.orders_ticket_is_cancelled === 1 && 'Thành Công'}
                    { item.orders_ticket_is_cancelled === 3 && 'Đã Huỷ' }
                  </td>
                  <td>
                    <button onClick={() => handlePrint(item)}
                        className='items-center justify-center flex mx-auto'>
                      <Printer />
                      </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* print components */ }
      <div style={ { display: 'none' } }>
        <PrintPage ref={ componentRef } />
      </div>
    </>
  );
};

export default Table;
