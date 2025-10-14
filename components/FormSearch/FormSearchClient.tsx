'use client';

import { useState } from 'react';
import { vehicleIcons, vehicleType } from '../../types/VehicleIcon';
import { useCityAutocomplete } from '@/lib/hooks/useCityAutocomplete';
import css from './FormSearch.module.css';
import { CamperFilters } from '../../types/TravelTruck';

type FormSearchProps = {
  loadCampers: (page?: number, filters?: CamperFilters) => void;
};

const FormSearch: React.FC<FormSearchProps> = ({ loadCampers }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const { results, setResults } = useCityAutocomplete(query);

  const toggleEquipment = (id: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const selectType = (id: string) => {
    setSelectedType((prev) => (prev === id ? null : id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let location = selectedLocation?.trim();
    if (location) {
      const parts = location.split(',').map((p) => p.trim());
      if (parts.length === 2) {
        location = `${parts[1]}, ${parts[0]}`;
      }
    }

    const filters: CamperFilters = {};

    if (location) filters.location = location;
    if (selectedType) filters.type = selectedType;
    if (selectedEquipment.length > 0) filters.equipment = selectedEquipment;

    loadCampers(1, filters);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css['search-box']}>
        <label htmlFor="location" className={css['location-label']}>
          Location
        </label>
        <div className={css['input-wrapper']}>
          <svg className={css['icon']}>
            <use href="/map.svg" />
          </svg>
          <input
            id="location"
            type="text"
            placeholder="City"
            className={css['location-input']}
            value={selectedLocation || query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedLocation('');
            }}
          />
          {results.length > 0 && (
            <ul className={css['autocomplete-list']}>
              {results.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSelectedLocation(item);
                    setResults([]);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <h2 className={css['filters-label']}>Filters</h2>

      <fieldset className={css.equipmentGroup}>
        <legend className={css.legendEquipment}>Vehicle equipment</legend>
        <ul className={css.vehicleList}>
          {vehicleIcons.map((item) => {
            const isSelected = selectedEquipment.includes(item.id);
            return (
              <li
                key={item.id}
                className={`${css.vehicleItem} ${isSelected ? css.selected : ''}`}
                onClick={() => toggleEquipment(item.id)}
              >
                <input
                  type="checkbox"
                  name="equipment"
                  value={item.id}
                  checked={isSelected}
                  readOnly
                />
                <label className={css.vehicleLabel}>
                  <svg className={css.vehicleIcon} width="32" height="32">
                    <use href={`/spriteEquipment.svg#${item.id}`} />
                  </svg>
                  <span>{item.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset className={css.equipmentGroup}>
        <legend className={css.legendEquipment}>Vehicle type</legend>
        <ul className={css.vehicleListType}>
          {vehicleType.map((item) => {
            const isSelected = selectedType === item.id;
            return (
              <li
                key={item.id}
                className={`${css.vehicleItemType} ${isSelected ? css.selectedType : ''}`}
                onClick={() => selectType(item.id)}
              >
                <input
                  type="radio"
                  name="vehicle-type"
                  value={item.id}
                  checked={isSelected}
                  readOnly
                  className={css.vehicleRadio}
                />
                <label className={css.vehicleLabelType}>
                  <svg className={css.vehicleIconType} width="32" height="32">
                    <use href={`/spriteType.svg#${item.id}`} />
                  </svg>
                  <span className={css.vehicleTextType}>{item.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
};

export default FormSearch;
