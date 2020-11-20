export interface TableItem {
  id: number;
  name: string;
  subName?: string;
  images: any[];
  status?: boolean;
  during: number;
  session?: string;
  room?: string;
}

export interface CardData {
  id: string;
  title: string;
  image: string;
  subTitle?: string;
  images?: string[];
}

export interface Possition {
  id: string;
  name: string;
  status: boolean;
}

export type DataType = {
  value: string;
  label: string;
};

export interface InitialFormMovie {
  isShow: boolean;
  id?: number;
  name: string;
  description: string;
  type: DataType[];
  director: string;
  producer: string;
  country: DataType,
  duration: number,
  thumbnail: string,
  images: string[],
}

export interface InitialFormSchedule {
  id: number;
  time: number;
  date: string;
  theater: string;
  theaterId: number;
  movieId: number;
  movie: string;
  location: string;
  price: number;
}
