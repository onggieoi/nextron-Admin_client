import { VND } from 'helper/currency';

export const checkTicketRespone = (data) => {
  // eslint-disable-next-line no-nested-ternary
  const status = data?.isCancelled === 3 ? 'Đã huỷ'
    : (data?.stateCheck ? 'Đã sử dụng' : 'Chưa sử dụng');

  const styleStatus = data?.isCancelled === 3 ? 'text-red-600' : '';

  return `
      <div style='text-align: left'>
        <div style='display: flex'>
          <div style='width: 33%'>Mã đơn hàng:</div>
          <div><b>${data?.orderNumber}</b></div>
        </div>

        <div style='display: flex'>
          <div style='width: 33%'>Mã vé:</div>
          <div><b>${data?.code}</b></div>
        </div>

        <div style='display: flex'>
          <div style='width: 33%'>Tên Vé:</div>
          <div><b>${data?.productName}</b></div>
        </div>

        <div style='display: flex'>
          <div style='width: 33%'>Loại vé:</div>
          <div><b>${data?.productTicketType === 0 ? 'Người Lớn' : 'Trẻ Em'}</b></div>
        </div>

        <div style='display: flex'>
          <div style='width: 33%'>Giá:</div>
          <div><b>${VND(data?.paidPrice || 0)}</b></div>
        </div>

        <div style='display: flex'>
          <div style='width: 33%'>Ngày mua:</div>
          <div><b>${data?.orderCreateAt}</b></div>
        </div>

        <div style='display: flex'>
          <div style='width: 33%'>Tên khách hàng:</div>
          <div><b>${data?.customerName || ''}</b></div>
        </div>

        <div style='display: flex'>
          <div style='width: 33%'>Số điện thoại:</div>
          <div><b>${data?.customerPhone || ''}</b></div>
        </div>

        <div style='display: flex'>
          <div style='width: 33%'>Email:</div>
          <div class='font-bold w-2/3'>
            ${data?.customerEmail || ''}
          </div>
        </div>

        <div style='display: flex'>
          <div style='width: 33%'>Cổng Soát vé:</div>
          <div><b>${data?.gate}</b></div>
        </div>

        <div style='display: flex'>
          <div style='width: 33%'>Tình trạng:</div>
          <div>
            <div class='${styleStatus} font-bold'>${status}</div>
            ${data?.stateCheck ? data?.stateCheck.map((state) => `
              <div class='font-bold'>
                ${state.nameGate === 'depart' ? 'Cổng Đi' : 'Cổng Về'}: 
                ${state.checkNumber} lần
                - ${state?.agency || 'unknown'}
              </div>`).join(' ') : ''}
          </div>
        </div>
            
      </div>`;
};

export const notActiveRespone = (data) => `
  ${data?.agencyName} <br />
  ${data?.agencyPhone} <br />
  ${data?.agnecyEmail} <br />
  ${data?.agencyAdress} <br />

  <div class='text-left flex'>
    <div class='w-1/3'>Tên Vé: </div>
    <div><b>${data?.productName}</b></div>
  </div>

  <div class='text-left flex'>
    <div class='w-1/3'>Khả dụng vào: </div>
    <div><b>${data?.productAvailableAt}</b></div>
  </div>

  <div class='text-left flex'>
    <div class='w-1/3'>Hết hạn vào: </div>
    <div><b>${data?.productExpireAt}</b></div>
  </div>
`;

export const checkOrderRespone = (data) => {
  let total = 0;
  const stateCheck = [] as { nameGate: string; checkNumber: number }[];

  data?.[0]?.stateCheck?.map(
    ({ nameGate }) => stateCheck.push({ nameGate, checkNumber: 0 }));

  data?.map((item: any) => {
    total += item?.paidPrice;
    item?.stateCheck?.map(({ checkNumber }, index) => {
      stateCheck[index].checkNumber += checkNumber || 0;
    });
  });

  const checkNumber = stateCheck.reduce((tot, state) => tot + state.checkNumber, 0) || 0;

  return `
    <div style='text-align: left'>
      <div style='display: flex'>
        <div style='width: 33%'>Mã đơn hàng:</div>
        <div><b>${data[0]?.orderOriginal}</b></div>
      </div>

      <div style='display: flex'>
        <div style='width: 33%'>Tên Vé:</div>
        <div><b>${data[0]?.productName}</b></div>
      </div>

      <div style='display: flex'>
        <div style='width: 33%'>Loại vé:</div>
        <div><b>${data[0]?.productTicketType === 0 ? 'Người Lớn' : 'Trẻ Em'}</b></div>
      </div>

      <div style='display: flex'>
        <div style='width: 33%'>Giá:</div>
        <div><b>${VND(total)}</b></div>
      </div>

      <div style='display: flex'>
        <div style='width: 33%'>Số vé lẻ:</div>
        <div><b>${data?.length}</b></div>
      </div>

      <div style='display: flex'>
        <div style='width: 33%'>Ngày mua:</div>
        <div><b>${data[0]?.orderCreateAt}</b></div>
      </div>

      <div style='display: flex'>
        <div style='width: 33%'>Tên khách hàng:</div>
        <div><b>${data[0]?.customerName || ''}</b></div>
      </div>

      <div style='display: flex'>
        <div style='width: 33%'>Số điện thoại:</div>
        <div><b>${data[0]?.customerPhone || ''}</b></div>
      </div>

      <div style='display: flex'>
        <div style='width: 33%'>Email:</div>
        <div class='font-bold w-2/3'>
          ${data[0]?.customerEmail || ''}
        </div>
      </div>

      <div style='display: flex'>
        <div style='width: 33%'>Cổng Soát vé:</div>
        <div><b>${data[0]?.gate || ''}</b></div>
      </div>

      <div style='display: flex'>
        <div style='width: 33%'>Trạng Thái:</div>
        <div class='font-bold'>
          <div>${checkNumber === 0 ? 'Chưa sử dụng' : 'Đã sử dụng'}</div>
          ${checkNumber !== 0 ? `
            ${stateCheck.map((state) => `<div>${state.nameGate}: ${state.checkNumber} lần</div>`).join(' ')}
          ` : ''}
        </div>
      </div>

</div>
`;
};
