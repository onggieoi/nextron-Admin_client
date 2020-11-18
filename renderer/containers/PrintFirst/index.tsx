import { useMutation } from '@apollo/client';
import React, { useState, useContext, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { useReactToPrint } from 'react-to-print';
import Nprogress from 'nprogress';

import { CartContext } from 'contexts/cart/cart.context';
import { CREATE_TICKET } from 'helper/graphql/mutation/ticket';
import PrintFirst from 'containers/PrintPage/PrintFirst';
import { AuthContext } from 'contexts/auth/auth.context';

class PrintPage extends React.Component {
  render() {
    return (
      <PrintFirst />
    );
  }
}

const PrintFirstComponent = () => {
  const [dateUsed, setDate] = useState(new Date());
  const [price, setPrice] = useState(0);
  const { setPrintFirst } = useContext(CartContext);
  const [createTicket] = useMutation(CREATE_TICKET);
  const componentRef = useRef<any>();
  const { authState } = useContext(AuthContext);
  const { name, agency } = authState.user;

  const clear = () => {
    setPrintFirst({});
  };

  const print = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      clear();
    },
    documentTitle: 'Point of sales',
  });

  const PrintButton = () => {
    Nprogress.start();
    if (price && dateUsed) {
      createTicket({
        variables: {
          data: {
            productData: [{ id: '26', qty: 1, coupon: '' }],
            email: '',
            createTicket: false,
            customer: '',
            visitors: '',
            address: '',
            phone: '',
            excel: false,
          },
        },
      }).then(({ data }) => {
        if (data?.createTicket?.ordersOriginal[0]) {
          setPrintFirst({
            price,
            date: dateUsed.toDateString(),
            value: data.createTicket.ordersOriginal[0],
            agencyName: name,
            agency,
          });
        }
      }).then(() => {
        print!();
        Nprogress.done();
      });
    }
  };

  return (
    <>
      <div className='p-5 text-lg'>
          <div className="flex items-center border-b border-gray-300 mb-5">
            <h2 className="font-bold text-2xl text-center w-full">Print First</h2>
          </div>
        <div className="mx-auto" style={{ maxWidth: '700px' }}>

          <div className="col-span-12 flex items-center">
            <label className='w-1/3'>Giá:</label>
            <div className="flex mt-2 flex-1">
              <input type="number" autoFocus value={ price || undefined } onChange={ (e) => setPrice(Number(e.target.value)) }
                className="input w-full border text-center" />
            </div>
          </div>

          <div className="col-span-12 flex items-center">
            <label className='w-1/3'>Ngày Sử Dụng:</label>
            <div className="flex mt-2 flex-1">
              <DatePicker
                selected={ dateUsed }
                className='input w-full border text-center'
                popperClassName='overflow-visible'
                popperModifiers={ {
                  offset: {
                    enabled: true,
                    offset: '5px, 10px',
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: 'viewport',
                  },
                } }
                onChange={ (date: any) => setDate(date) }
              />
            </div>
          </div>
        {/* Buttons */ }
          <div className="px-5 py-3 border-t border-gray-200 w-full flex mt-5">
            <button onClick={ PrintButton }
              className="button w-64 bg-theme-1 text-white ml-auto shadow-md">
              In Vé
            </button>
          </div>
        </div>
      </div>

      {/* Print Content */}
      <div style={ { display: 'none' } }>
        <PrintPage ref={ componentRef } />
      </div>
    </>
  );
};

export default PrintFirstComponent;
