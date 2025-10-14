export type Gallery = {
  thumb: string;
  original: string;
};

export type Review = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

export type TravelTruck = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;

  ac?: boolean;
  automatic?: boolean;
  kitchen?: boolean;
  tv?: boolean;
  bathroom?: boolean;
  petrol?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;

  gallery: Gallery[];
  reviews: Review[];
};

export type CamperResponse = {
  total: number;
  items: TravelTruck[];
};

export type CamperFilters = {
  equipment?: string[];
  type?: string | null;
  location?: string;
};
