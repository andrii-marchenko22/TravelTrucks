import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TravelTruck, CamperFilters, CamperResponse } from '@/types/TravelTruck';
import { fetchCampers } from '@/lib/api/clientApi';

type CampersStore = {
  filters?: CamperFilters;
  favorites: string[];
  campers: TravelTruck[];
  page: number;
  perPage: number;
  total: number;
  loading: boolean;

  setFilters: (filters?: CamperFilters) => void;
  resetFilters: () => void;

  setPage: (page: number) => void;
  setCampers: (campers: TravelTruck[]) => void;
  setLoading: (loading: boolean) => void;

  toggleFavorite: (id: string) => void;
  loadCampers: (page?: number, filters?: CamperFilters) => Promise<void>;
};

const initialStore = {
  filters: undefined,
  favorites: [] as string[],
  campers: [] as TravelTruck[],
  page: 1,
  perPage: 4,
  total: 0,
  loading: false,
};

export const useCampersStore = create<CampersStore>()(
  persist(
    (set, get) => ({
      ...initialStore,

      setFilters: (filters) => set({ filters }),
      resetFilters: () => set({ filters: initialStore.filters }),

      setPage: (page) => set({ page }),
      setCampers: (campers) => set({ campers }),
      setLoading: (loading) => set({ loading }),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id],
        })),

      loadCampers: async (page = 1, filters) => {
        const hasAnyFilter =
          filters?.location?.trim() ||
          filters?.type ||
          (filters?.equipment && filters.equipment.length > 0);

        if (!hasAnyFilter) {
          set({ campers: [], total: 0, page: 1, filters });
          return;
        }

        try {
          set({ loading: true });
          const perPage = get().perPage;
          const res: CamperResponse = await fetchCampers(page, perPage, filters);

          set((state) => ({
            campers: page === 1 ? res.items : [...state.campers, ...res.items],
            total: res.total,
            page,
            filters: filters ?? state.filters,
          }));
        } catch (err: unknown) {
          if (
            typeof err === 'object' &&
            err !== null &&
            'response' in err &&
            typeof (err as { response?: { status?: number } }).response === 'object' &&
            (err as { response?: { status?: number } }).response !== null
          ) {
            const status = (err as { response?: { status?: number } }).response?.status;
            if (status === 404) {
              set({
                campers: [],
                total: 0,
                page: 1,
                filters,
              });
              return;
            }
          }
          console.error('loadCampers error:', err);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'campers-store',
      partialize: (state) => ({
        filters: state.filters,
        favorites: state.favorites,
        campers: state.campers,
      }),
    },
  ),
);
