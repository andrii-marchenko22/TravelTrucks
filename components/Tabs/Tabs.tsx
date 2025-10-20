'use client';

import css from './Tabs.module.css';

type TabsProps = {
  activeTab: 'features' | 'reviews';
  setActiveTab: (tab: 'features' | 'reviews') => void;
};

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
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
  );
};

export default Tabs;
