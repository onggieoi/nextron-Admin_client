/* eslint-disable max-len */
const URL = process.env.URL_EXCEL || '';

export const epExportExcel = (id: any, search: string, dateStart: Date, dateEnd: Date) => {
  if (search) {
    return `${URL}?agencyId=${Number(id)}&search=${search}&st=${dateStart.getDate()}-${dateStart.getUTCMonth() + 1}-${dateStart.getUTCFullYear()}&ed=${dateEnd.getDate()}-${dateEnd.getUTCMonth() + 1}-${dateEnd.getUTCFullYear()}&excel=true`;
  }

  return `${URL}?agencyId=${Number(id)}&st=${dateStart.getDate()}-${dateStart.getUTCMonth() + 1}-${dateStart.getUTCFullYear()}&ed=${dateEnd.getDate()}-${dateEnd.getUTCMonth() + 1}-${dateEnd.getUTCFullYear()}&excel=true`;
};
