'use client';

import { useRef } from 'react';
import CardsTravelTrucksInfo from '@/components/CardsTravelTrucksInfo/CardsTravelTrucksInfo';
import FormSearch from '@/components/FormSearch/FormSearchClient';
import css from './page.module.css';
import { useCampersStore } from '@/lib/store/CampersStore';
import { CamperFilters } from '@/types/TravelTruck';

const Catalog = () => {
  const store = useCampersStore();
  const { campers, total, page, filters, loadCampers, loading, hasSearched, setHasSearched } =
    store;

  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  const handleSearch = (pageNum?: number, filtersParam?: CamperFilters) => {
    setHasSearched(true);
    loadCampers(pageNum ?? 1, filtersParam);
  };

  const handleLoadMore = () => {
    loadCampers(page + 1, filters);
  };

  const renderMessage = () => {
    if (!loading && campers.length === 0) return <p>Not found</p>;
    if (loading && campers.length === 0) return <p>Loading...</p>;
    return null;
  };

  return (
    <div className={css.catalogContainer}>
      <div className={css.filtersWrapper}>
        <FormSearch loadCampers={handleSearch} initialFilters={filters} />
      </div>

      <div className={css.cardsWrapper} ref={cardsWrapperRef}>
        {renderMessage()}

        {campers.length > 0 && (
          <>
            <CardsTravelTrucksInfo campers={campers} hasSearched={hasSearched} />
            {campers.length < total && (
              <button className={css.showMoreBtn} onClick={handleLoadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;
