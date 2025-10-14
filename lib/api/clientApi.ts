import type { TravelTruck, CamperResponse } from '@/types/TravelTruck';
import { api } from './api';

export const fetchCampers = async (page = 1, perPage = 4): Promise<CamperResponse> => {
  const { data } = await api.get<CamperResponse>('/campers', {
    params: {
      page,
      limit: perPage,
    },
  });
  return data;
};

export const fetchCamperById = async (id: string): Promise<TravelTruck> => {
  const { data } = await api.get<TravelTruck>(`/campers/${id}`);
  return data;
};
