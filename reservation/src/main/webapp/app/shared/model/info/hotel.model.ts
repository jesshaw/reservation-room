export interface IHotel {
  id?: number;
  name?: string;
  address?: string;
  postCode?: string;
  city?: string;
  url?: string;
}

export const defaultValue: Readonly<IHotel> = {};
