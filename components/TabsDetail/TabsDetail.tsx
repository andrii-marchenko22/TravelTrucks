import Tabs from '@/components/Tabs/Tabs';
import { TravelTruck } from '@/types/TravelTruck';
import css from './TabsDetail.module.css';
import { vehicleIcons } from '@/types/VehicleIcon';

type TabsDetailProps = {
  camper: TravelTruck;
};

const TabsDetail = ({ camper }: TabsDetailProps) => {
  return (
    <div className={css.detailsWrapper}>
      <Tabs
        featuresContent={
          <div className={css.container}>
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

            <div className={css.detailsBlock}>
              <h3 className={css.detailsTitle}>Vehicle details</h3>
              <ul className={css.detailsList}>
                <li>
                  <span>Form</span>
                  <span>{camper.form}</span>
                </li>
                <li>
                  <span>Length</span>
                  <span>{camper.length}</span>
                </li>
                <li>
                  <span>Width</span>
                  <span>{camper.width}</span>
                </li>
                <li>
                  <span>Height</span>
                  <span>{camper.height}</span>
                </li>
                <li>
                  <span>Tank</span>
                  <span>{camper.tank}</span>
                </li>
                <li>
                  <span>Consumption</span>
                  <span>{camper.consumption}</span>
                </li>
              </ul>
            </div>
          </div>
        }
        reviewsContent={
          <div className={css.reviews}>
            <h3>Reviews</h3>
            {camper.reviews?.length ? (
              camper.reviews.map((rev, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <strong>{rev.reviewer_name}</strong>: {rev.comment}
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        }
      />
    </div>
  );
};

export default TabsDetail;
