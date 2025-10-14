'use client';

import { useState, useRef } from 'react';
import CardsTravelTrucksInfo from '@/components/CardsTravelTrucksInfo/CardsTravelTrucksInfo';
import FormSearch from '@/components/FormSearch/FormSearchClient';
import { TravelTruck, CamperFilters, CamperResponse } from '@/types/TravelTruck';
import { fetchCampers } from '@/lib/api/clientApi';
import css from './page.module.css';

const Catalog = () => {
  const [campers, setCampers] = useState<TravelTruck[]>([]);
  const [totalCampers, setTotalCampers] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 4;
  const [hasSearched, setHasSearched] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<CamperFilters | undefined>();

  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  const loadCampers = async (pageNumber = 1, filters?: CamperFilters) => {
    try {
      const res: CamperResponse = await fetchCampers(pageNumber, perPage);
      setCampers((prev) => (pageNumber === 1 ? res.items : [...prev, ...res.items]));
      setTotalCampers(res.total);
      setPage(pageNumber);
      setAppliedFilters(filters);
      setHasSearched(true);

      if (pageNumber > 1) {
        const firstCard = document.querySelector<HTMLLIElement>('.cardItem');
        if (firstCard) {
          const cardHeight = firstCard.getBoundingClientRect().height;
          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        }
      }
    } catch (err) {
      console.error('Fetch campers failed:', err);
    }
  };

  const handleSearch = (page?: number, filters?: CamperFilters) => {
    loadCampers(1, filters);
  };

  return (
    <div className={css.catalogContainer}>
      <div className={css.filtersWrapper}>
        <FormSearch loadCampers={handleSearch} />
      </div>

      <div className={css.cardsWrapper} ref={cardsWrapperRef}>
        {!hasSearched ? (
          <p>Start your search to see available campers</p>
        ) : campers.length === 0 ? (
          <p>No campers found</p>
        ) : (
          <>
            <CardsTravelTrucksInfo campers={campers} hasSearched={hasSearched} />
            {campers.length < totalCampers && (
              <button
                className={css.showMoreBtn}
                onClick={() => loadCampers(page + 1, appliedFilters)}
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;
