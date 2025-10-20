'use client';

import { useState } from 'react';
import Tabs from '@/components/Tabs/Tabs';
import { TravelTruck } from '@/types/TravelTruck';
import css from './TabsDetail.module.css';
import { vehicleIcons } from '@/types/VehicleIcon';
import BookingForm from '@/components/BookingForm/BookingForm';

type TabsDetailProps = {
  camper: TravelTruck;
};

const TabsDetail = ({ camper }: TabsDetailProps) => {
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  const featuresContent = (
    <div className={css.featuresContent}>
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
  );

  const reviewsContent = (
    <div className={css.reviewsContainer}>
      {camper.reviews?.length ? (
        camper.reviews.map((rev, i) => (
          <div key={i} className={css.reviewItem}>
            <div className={css.reviewAvatar}>{rev.reviewer_name[0].toUpperCase()}</div>

            <div className={css.reviewContent}>
              <strong className={css.reviewerName}>{rev.reviewer_name}</strong>

              <div className={css.stars}>
                {Array.from({ length: 5 }).map((_, n) => (
                  <svg key={n} className={css.starIcon} width={16} height={16}>
                    <use
                      href={`/spriteTrevelCard.svg#${n < rev.reviewer_rating ? 'star' : 'emtyStar'}`}
                    />
                  </svg>
                ))}
              </div>

              <p className={css.reviewComment}>{rev.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );

  return (
    <div className={css.detailsWrapper}>
      <div className={css.tabsPanel}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className={css.contentArea}>
        <div className={css.leftColumn}>
          {activeTab === 'features' ? featuresContent : reviewsContent}
        </div>

        <div className={css.rightColumn}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default TabsDetail;
