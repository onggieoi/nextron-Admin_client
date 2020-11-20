import Resizer from 'react-image-file-resizer';

export const VND = (money: number) => money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

export const formatDate = (date: Date) => (`${date.getUTCMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)

export const formatTime = (t: string) => {
  const date = new Date(Number(t));

  return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

export const resizeFile = (file) => new Promise(resolve => {
  Resizer.imageFileResizer(
    file,
    300,
    300,
    'JPEG',
    100,
    0,
    uri => {
      resolve(uri);
    },
    'base64',
    300,
    300,
  );
});
