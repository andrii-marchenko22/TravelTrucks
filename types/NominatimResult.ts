export type NominatimResult = {
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    country: string;
  };
};
