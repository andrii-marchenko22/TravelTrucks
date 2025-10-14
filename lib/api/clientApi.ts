import type { TravelTruck, CamperResponse, CamperFilters } from '@/types/TravelTruck';
import { api } from './api';
import { equipmentKeyMap } from '@/types/equipmentTags';

export const fetchCampers = async (
  page = 1,
  perPage = 4,
  filters?: CamperFilters,
): Promise<CamperResponse> => {
  const params: Record<string, string | number | boolean> = {
    page,
    limit: perPage,
  };

  if (filters) {
    if (filters.location?.trim()) {
      params.location = filters.location.trim();
    }

    if (filters.type) {
      params.form = filters.type.toLowerCase();
    }

    if (Array.isArray(filters.equipment) && filters.equipment.length > 0) {
      filters.equipment.forEach((eqId) => {
        const key = equipmentKeyMap[eqId] ?? eqId;

        if (
          key === 'AC' ||
          key === 'TV' ||
          key === 'bathroom' ||
          key === 'kitchen' ||
          key === 'gas' ||
          key === 'water' ||
          key === 'refrigerator' ||
          key === 'microwave'
        ) {
          params[key] = true;
        }

        if (key === 'petrol' || key === 'hybrid') {
          params.engine = key;
        }
        if (key === 'automatic' || key === 'manual') {
          params.transmission = key;
        }
      });
    }
  }

  const { data } = await api.get<CamperResponse>('/campers', { params });
  return data;
};

export const fetchCamperById = async (id: string): Promise<TravelTruck> => {
  const { data } = await api.get<TravelTruck>(`/campers/${id}`);
  return data;
};
