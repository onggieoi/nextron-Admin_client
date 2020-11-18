import React from 'react';
import { Modal } from '@redq/reuse-modal';

import Main from 'containers/PointOfSale/Main';
import Ticket from 'containers/PointOfSale/Ticket';

const PointOfSale = () => (
  <Modal>
    <div className="pos intro-y grid grid-cols-12 gap-2 mt-1">
      <div className="intro-y col-span-8">
        <Main />
      </div>
      <div className='intro-y col-span-4'>
        <Ticket />
      </div>
    </div>
  </Modal>
);

export default PointOfSale;
