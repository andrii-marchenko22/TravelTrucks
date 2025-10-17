'use client';

import { useState } from 'react';
import css from './Tabs.module.css';

type TabsProps = {
  featuresContent: React.ReactNode;
  reviewsContent: React.ReactNode;
};

const Tabs = ({ featuresContent, reviewsContent }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  return (
    <div className={css.tabsContainer}>
      <div className={css.tabHeaders}>
        <button
          className={`${css.tabButton} ${activeTab === 'features' ? css.active : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={`${css.tabButton} ${activeTab === 'reviews' ? css.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={css.tabContent}>
        {activeTab === 'features' ? featuresContent : reviewsContent}
      </div>
    </div>
  );
};

export default Tabs;
