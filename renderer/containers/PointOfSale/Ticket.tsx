import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { useReactToPrint } from 'react-to-print';
import NProgress from 'nprogress';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

import { CartContext } from 'contexts/cart/cart.context';
import ListTickets from 'components/ListTickets';
import ComponentToPrint from 'containers//PrintPage/ComponentToPrint';
import { CREATE_TICKET } from 'helper/graphql/mutation/ticket';
import { VND } from 'helper/currency';
import Details from 'containers/PointOfSale/Details';
import { PlusSquare } from 'react-feather';

class PrintPage extends React.Component {
  render() {
    return (
      <ComponentToPrint />
    );
  }
}

const Ticket = () => {
  const {
    tickets,
    finalPrice,
    clear,
    details,
    ticketInput,
    orderHandle,
    setFetch,
  } = useContext(CartContext);
  const [active, setActive] = useState({ ticket: true, detail: false });
  const [createTicket] = useMutation(CREATE_TICKET);
  // const [checkOrder] = useMutation(CHECK_ORDER);
  const componentRef = useRef<any>();
  const [outStockId, setOutStockId] = useState([] as any);

  // feature coolin cashing
  const [cashInput, setCash] = useState(0 as any);
  const [money, setMoney] = useState([] as number[]);
  const [cardShow, setShow] = useState(false);

  useEffect(() => {
    let price = 0;
    money.forEach((item) => { price += item; });
    setCash(price);
  }, [money.length]);

  useEffect(() => {
    if (cashInput < 0) return setCash(0);
    if (cashInput > 100000000) return setCash(100000000);
  }, [cashInput]);

  const detailTabed = () => {
    setActive({
      ticket: false,
      detail: true,
    });
  };

  const ticketTabed = () => {
    setActive({
      ticket: true,
      detail: false,
    });
  };

  const handleClear = () => {
    clear();
    setOutStockId([] as any);
    setCash(0);
    setMoney([] as number[]);
  };

  const print = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      handleClear();
      setFetch(false);
    },
    documentTitle: 'Point of sales',
  });

  const handleCharge = async () => {
    if (!tickets.length) {
      return;
    }

    let printRepresent = false;
    if (details.typeTicket === 'group' && tickets.length === 1) {
      const result = await Swal.fire({
        title: 'In 1 vé đại diện ?',
        showCancelButton: true,
        confirmButtonColor: '#2e51bb',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });
      if (result.value) printRepresent = true;
    }

    NProgress.start();

    if (details.typeTicket === 'group') {
      ticketInput.visitors = encodeURIComponent(details.name);
    } else {
      ticketInput.customer = encodeURIComponent(details.name);
    }
    ticketInput.email = encodeURIComponent(details.email);
    ticketInput.address = encodeURIComponent(details.address);
    ticketInput.phone = encodeURIComponent(details.phone);
    createTicket({
      variables: {
        data: ticketInput,
      },
    }).then(({ data, errors }) => {
      if (data?.createTicket?.errors || errors) {
        let errMess = '';
        data.createTicket.errors.forEach((err) => {
          if (err?.outStock) {
            errMess = `${errMess} - Đã Hết ${err.productName}`;
            outStockId.push(err.id);
            setOutStockId([...outStockId]);
          } else if (err?.couponUsed) {
            errMess = 'Coupon Đã Được Sử Dụng';
          } else {
            errMess = 'something wrong';
          }
        });

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errMess,
        });
      }

      if (data.createTicket.iSuccess) {
        setFetch(true);
        orderHandle(data.createTicket.ordersOriginal, data.createTicket.ticketInfo, printRepresent);
        setTimeout(() => {
          print!();
        }, 1000);
      }
      NProgress.done();
    });
  };

  useEffect(() => (() => {
    handleClear();
    setFetch(false);
  }), []);

  return (
    <>
      {/* Menu */}
      <div className="intro-y pr-1">
        <div className="box p-2">
          <div className="pos__tabs nav-tabs justify-center flex">
            <button onClick={ticketTabed}
              className={active.ticket ? 'flex-1 py-2 rounded-md text-center bg-theme-3 text-white'
                : 'flex-1 py-2 rounded-md text-center'}>
              Thông Tin Vé
            </button>
            <button onClick={detailTabed}
              className={active.detail ? 'flex-1 py-2 rounded-md text-center bg-theme-3 text-white'
                : 'flex-1 py-2 rounded-md text-center'}>
              Thông Tin Khách
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="tab-content">
        {/* ticket */}
        <div className={active.ticket ? 'tab-content__pane active' : 'tab-content__pane'}>
          {/* List Tickets */}
          <ListTickets tickets={tickets} outStock={outStockId} />

          {/* Cash Box */}
          <div className="box p-2 mt-1">
            {/* Total */}
            <div className="flex mb-2">
              <div className="mr-auto font-medium text-base">Tổng Tiền</div>
              <div className="font-medium text-base">{VND(finalPrice)}</div>
            </div>

            {/* input tien nhan */ }
            <div className='flex items-center mb-2'>
                <div className="mr-auto font-medium text-base">Tiền nhận: </div>
              <div className='ml-auto border-b' style={{ maxWidth: '80px' }}>
                <input type="number"
                  value={ cashInput }
                  onChange={ (e) => setCash(Number(e.target.value)) }
                  className='w-full text-base font-medium outline-none text-right' />
              </div>
              <div className='text-base ml-1 font-medium'>₫</div>
            </div>

            {/* tien tra */}
            <div className="flex">
              <div className="mr-auto font-medium text-base">Tiền Trả: </div>
              <div className="font-medium text-base">{ VND(cashInput - finalPrice) }</div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className={active.detail ? 'tab-content__pane active' : 'tab-content__pane'} id="details">
          <Details />
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-col mt-2">
        <button
          onClick={handleCharge}
          className="button w-full text-white bg-theme-1 shadow-md mx-auto">
          In Vé
        </button>
        <button onClick={handleClear}
          className="button w-full border border-gray-400 text-gray-600 mx-auto my-2">
          Xóa Tất Cả
        </button>
      </div>

      {/* Money cards */}
      <div className='flex'>
        <button className='ml-auto' onClick={() => setShow(!cardShow)}>
          <PlusSquare />
        </button>
      </div>

      { cardShow && (<div className='intro-x grid grid-cols-12 gap-3 mt-2'>
        <button className='col-span-6 rounded-md shadow-lg w-full py-2 text-center'
          onClick={ () => setMoney([...money, 10000]) }
        >
          {VND(10000)}
        </button>
        <button className='col-span-6 rounded-md shadow-lg w-full py-2 text-center'
          onClick={ () => setMoney([...money, 20000]) }
        >
          { VND(20000) }
        </button>
        <button className='col-span-6 rounded-md shadow-lg w-full py-2 text-center'
          onClick={ () => setMoney([...money, 50000]) }
        >
          { VND(50000) }
        </button>
        <button className='col-span-6 rounded-md shadow-lg w-full py-2 text-center'
          onClick={ () => setMoney([...money, 100000]) }
        >
          { VND(100000) }
        </button>
        <button className='col-span-6 rounded-md shadow-lg w-full py-2 text-center'
          onClick={ () => setMoney([...money, 200000]) }
        >
          { VND(200000) }
        </button>
        <button className='col-span-6 rounded-md shadow-lg w-full py-2 text-center'
          onClick={ () => setMoney([...money, 500000]) }
        >
          { VND(500000) }
        </button>

        {/* buttons */}
        <button className='col-span-6 rounded-md shadow-lg w-full py-2 text-center bg-theme-3 text-white'
          onClick={ () => setMoney(money.slice(0, -1)) }
        >
          Undo
        </button>

        <button className='col-span-6 rounded-md shadow-lg w-full py-2 text-center bg-theme-3 text-white'
          onClick={ () => {
            setMoney([] as number[]);
          }}
        >
          Reset
        </button>
      </div>)}

      {/* print components */}
      <div style={{ display: 'none' }}>
        <PrintPage ref={componentRef} />
      </div>
    </>
  );
};

export default Ticket;
