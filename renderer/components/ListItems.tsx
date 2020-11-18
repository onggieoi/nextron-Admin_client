import React from 'react';

import Item from 'components/Item';

type ListItemsProps = {
  data: any[];
  fullSize: boolean;
};

const ListItems: React.FC<ListItemsProps> = ({ data, fullSize }) => {
  const handleFullSize = () => {
    if (fullSize) {
      return {
        height: '87vh',
      };
    }
    return {
      height: '72vh',
    };
  };

  return (
  <>
    <div className='border-t-2 border-theme-5 mb-2'></div>
      <div className='overflow-y-scroll pb-10' style={ handleFullSize() }>
      <div className="grid grid-cols-12 gap-1 mt-2">
        {
          data.map((item: any) => (
            <Item key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  </>
  );
};

export default ListItems;
