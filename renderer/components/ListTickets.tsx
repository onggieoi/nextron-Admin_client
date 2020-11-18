import React from 'react';

import Ticket from 'components/TicketDetail';

type Props = {
  tickets: any;
  outStock: [];
};

const ListTickets: React.FC<Props> = ({ tickets, outStock }) => {
  if (!tickets.length) {
    return (
      <div className="pos__ticket box p-2 mt-1">
        <div className='text-center text-xl'>Giỏ hàng rỗng</div>
      </div>
    );
  }

  const handleErr = (id: string) => {
    if (outStock.find((item) => item === id)) {
      return true;
    }
    return false;
  };

  return (
    <div className="pos__ticket box p-2 mt-1 overflow-y-scroll" style={{ maxHeight: '200px' }}>
      {
        tickets.map((ticket) => (
          <Ticket key={ticket.item.id} ticket={ticket} onErr={handleErr(ticket.item.id)} />
        ))
      }
    </div>
  );
};

export default ListTickets;
