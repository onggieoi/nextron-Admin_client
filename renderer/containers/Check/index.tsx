import React, { useEffect, useRef, useState } from 'react';
import NProgress from 'nprogress';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

import {
  CHECK, ACTIVE, CANCEL_TICKET, CHECK_ORDER,
} from 'helper/graphql/mutation/ticket';
import { checkOrderRespone, checkTicketRespone, notActiveRespone } from './htmlHelper';

const CheckPage = () => {
  const [code, setCode] = useState('');
  const [checkTicket] = useMutation(CHECK);
  const [activeTicket] = useMutation(ACTIVE);
  const [cancelTicket] = useMutation(CANCEL_TICKET);
  const [checkOrder] = useMutation(CHECK_ORDER);
  const input = useRef<any>();

  const customSwal = Swal.mixin({
    onAfterClose: () => input.current.focus(),
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  const handleActive = () => {
    NProgress.start();
    activeTicket({
      variables: {
        data: {
          code,
        },
      },
    }).then(({ data, errors }) => {
      if (errors || !data.activeTicket.status) {
        customSwal.fire({
          icon: 'error',
          title: 'Something Wrong...',
          text: 'Can not Active!',
        });
      }

      if (data.activeTicket.status) {
        customSwal.fire({
          icon: 'success',
          title: 'Successful!!',
          text: 'Active ticket successful',
        });
      }

      NProgress.done();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code) return;

    NProgress.start();
    checkTicket({
      variables: {
        data: {
          code,
        },
      },
    }).then(({ data, errors }) => {
      // not found
      if (errors || data.checkTicket.message === 'TICKER_NOT_FOUND') {
        // check orders
        checkOrder({
          variables: {
            data: {
              code,
            },
          },
        }).then((resultCheckOrder) => {
          if (!resultCheckOrder?.data?.checkOrder?.ordersTicketData?.length) { // not found
            customSwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Vé không hợp lệ!',
            });
          } else {
            customSwal.fire({
              icon: 'success',
              html: checkOrderRespone(resultCheckOrder?.data?.checkOrder?.ordersTicketData),
            });
          }
        });
      }

      // not Actived yet
      if (data.checkTicket?.orderPreOrder?.agencyName) {
        customSwal.fire({
          icon: 'warning',
          title: 'Vé chưa kích hoạt!!',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Kích Hoạt Ngay',
          html: notActiveRespone(data.checkTicket?.orderPreOrder),
        }).then((result) => {
          if (result.isConfirmed) return handleActive();
        });

        input.current.focus();
      }

      // actived
      if (data.checkTicket?.ordersTicketData?.code) {
        const icon = data.checkTicket?.ordersTicketData?.isCancelled === 3 ? 'warning' : 'success';

        customSwal.fire({
          icon,
          html: checkTicketRespone(data.checkTicket?.ordersTicketData),
          showCancelButton: !data.checkTicket?.ordersTicketData?.stateCheck && data.checkTicket?.ordersTicketData?.isCancelled === 1,
          cancelButtonText: 'Huỷ vé',
          cancelButtonColor: 'red',
        }).then(({ isDismissed, dismiss }) => {
          // Cancel
          if (isDismissed && dismiss === Swal.DismissReason.cancel) {
            customSwal.fire({
              title: 'Xác Thực Huỷ vé',
              text: 'Lí do: ',
              input: 'text',
              showCancelButton: true,
            }).then(({ value }:any) => {
              cancelTicket({
                variables: {
                  data: {
                    ticketCode: code,
                    reason: encodeURIComponent(value),
                  },
                },
              }).then((dataResult) => {
                customSwal.fire({
                  icon: dataResult?.data?.cancelTicket?.success ? 'success' : 'error',
                  text: dataResult?.data?.cancelTicket?.message,
                });
              });
            });
          }
        });
      }

      setCode('');
      input.current.focus();
      NProgress.done();
    });
  };

  return (
    <>
      <form className='intro-x my-10 flex items-center text-xl font-medium' onSubmit={ handleSubmit }>
        <div className='mx-auto'>
          <label>Code: </label>
          <input ref={input} onChange={(e) => setCode(e.target.value)} value={code}
            className='input border' type="text" autoFocus />
        <button type="submit"
          className='button bg-theme-1 ml-3  text-white px-10 shadow-md'>
          Check
        </button>
        </div>
      </form>
    </>
  );
};

export default CheckPage;
