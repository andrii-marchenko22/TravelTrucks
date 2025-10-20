import { Metadata } from 'next';
import { fetchCamperById } from '@/lib/api/clientApi';
import css from './page.module.css';
import Image from 'next/image';
import TabsDetail from '@/components/TabsDetail/TabsDetail';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const camper = await fetchCamperById(id);

  return {
    title: `${camper.name}`,
    description: camper.description.slice(0, 30),
    openGraph: {
      title: `Note: ${camper.name}`,
      description: camper.description.slice(0, 100),
      url: `https://travel-trucks-serg.vercel.app/campers/${id}`,
      siteName: 'TravelTruck',
      images: camper.gallery.slice(0, 2).map((img) => ({
        url: img.original,
        width: 1200,
        height: 630,
        alt: camper.name,
      })),
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: camper.name,
      description: camper.description.slice(0, 100),
      images: camper.gallery.slice(0, 2).map((img) => img.original),
    },
  };
}

const CamperDetailsPage = async ({ params }: Props) => {
  const { id } = params;
  const camper = await fetchCamperById(id);

  return (
    <div className={css.container}>
      <div>
        <h1 className={css.title}>{camper.name}</h1>
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
        <span className={css.price}>€{camper.price}.00</span>
      </div>
      <div className={css.imagesSection}>
        {camper.gallery.map((img, index) => (
          <div key={index} className={css.imageWrapper}>
            <Image
              src={img.original}
              alt={`${camper.name} photo ${index + 1}`}
              width={292}
              height={312}
              className={css.galleryImage}
            />
          </div>
        ))}
      </div>
      <p className={css.description}>{camper.description}</p>

      <TabsDetail camper={camper} />
    </div>
  );
};

export default CamperDetailsPage;
