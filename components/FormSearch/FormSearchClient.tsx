'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { NominatimResult, vehicleIcons, vehicleType } from '../../types/VehicleIcon';
import css from './FormSearch.module.css';
import useDebounce from '@/lib/hooks/useDebounce';

const FormSearch = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const debouncedQuery = useDebounce(query, 500);

  const toggleEquipment = (id: string) => {
    if (selectedEquipment.includes(id)) {
      setSelectedEquipment(selectedEquipment.filter((i) => i !== id));
    } else {
      setSelectedEquipment([...selectedEquipment, id]);
    }
  };

  const selectType = (id: string) => {
    setSelectedType(id);
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await axios.get<NominatimResult[]>(
          'https://nominatim.openstreetmap.org/search',
          {
            params: {
              format: 'json',
              countrycodes: 'ua',
              'accept-language': 'en',
              q: debouncedQuery,
              addressdetails: 1,
              limit: 5,
            },
          },
        );

        const cities = res.data
          .map((item) => {
            const cityName = item.address.city || item.address.town || item.address.village;
            return cityName ? `${cityName}, Ukraine` : null;
          })
          .filter((city): city is string => city !== null);

        setResults(cities);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCities();
  }, [debouncedQuery]);

  return (
    <form className={css.form}>
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
