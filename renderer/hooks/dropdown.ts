import { useState } from 'react';

export default function useDropdown() {
  const [dropDown, setDropDown] = useState(false);

  const handleDrop = () => {
    setDropDown(!dropDown);
  };

  const handleClose = () => {
    setDropDown(false);
  };

  const isDrop = () => {
    if (dropDown) return 'show';
    return '';
  };

  return { handleDrop, isDrop, handleClose };
}
