'use client';

import Image from 'next/image';
import css from './CardsTravelTrucksInfo.module.css';
import { TravelTruck } from '@/types/TravelTruck';
import { vehicleIcons } from '@/types/VehicleIcon';
import { useRouter } from 'next/navigation';
import { useCampersStore } from '@/lib/store/CampersStore';

type Props = {
  campers?: TravelTruck[];
  hasSearched: boolean;
};

const CardsTravelTrucksInfo: React.FC<Props> = ({ campers = [], hasSearched }) => {
  const router = useRouter();
  const favorites = useCampersStore((s) => s.favorites);
  const toggleFavorite = useCampersStore((s) => s.toggleFavorite);

  if (!hasSearched) return <p>Start your search to see available campers</p>;
  if (campers.length === 0) return <p>No campers found</p>;

  const formatPrice = (price?: number) => {
    if (typeof price !== 'number') return '-';
    return price.toFixed(2);
  };

  return (
    <div className={css.cardsContainer}>
      <ul className={css.cardList}>
        {campers.map((camper) => (
          <li key={camper.id} className={css.cardItem}>
            <div className={css.imageWrapper}>
              {camper.gallery?.[0]?.thumb ? (
                <Image
                  src={camper.gallery[0].thumb}
                  alt={camper.name}
                  width={292}
                  height={320}
                  className={css.image}
                />
              ) : (
                <div className={css.placeholder}>No image</div>
              )}
            </div>

            <div className={css.infoContainer}>
              <div className={css.headerRow}>
                <h3 className={css.cardTitle}>{camper.name}</h3>
                <div className={css.priceAndFav}>
                  <span className={css.price}>€{formatPrice(camper.price)}</span>
                  <svg
                    className={css.heartIcon}
                    width={24}
                    height={24}
                    onClick={() => toggleFavorite(camper.id)}
                  >
                    <use
                      href={
                        favorites.includes(camper.id)
                          ? '/spriteTrevelCard.svg#redHeart'
                          : '/spriteTrevelCard.svg#heart'
                      }
                    />
                  </svg>
                </div>
              </div>

              <div className={css.ratingRow}>
                <svg className={css.starIcon} width={16} height={16}>
                  <use href="/spriteTrevelCard.svg#star" />
                </svg>
                <span className={css.ratingValue}>{camper.rating?.toFixed(1) ?? '-'}</span>
                <span className={css.reviewsCount}>({camper.reviews?.length ?? 0} reviews)</span>
                <svg className={css.locationIcon} width={24} height={24}>
                  <use href="/map.svg" />
                </svg>
                <span className={css.location}>{camper.location ?? '-'}</span>
              </div>
              <p className={css.description}>{camper.description ?? '-'}</p>
              <div className={css.tags}>
                {vehicleIcons
                  .filter((icon) => camper[icon.id as keyof TravelTruck])
                  .map((icon) => (
                    <div key={icon.id} className={css.tagItem}>
                      <svg className={css.tagIcon} width={20} height={20}>
                        <use href={`/spriteEquipment.svg#${icon.id}`} />
                      </svg>
                      <span className={css.text}>{icon.label}</span>
                    </div>
                  ))}
              </div>
              <button
                className={css.showMoreBtn}
                onClick={() => router.push(`/campers/${camper.id}`)}
              >
                Show more
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardsTravelTrucksInfo;
