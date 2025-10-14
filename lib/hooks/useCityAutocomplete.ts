'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import useDebounce from '@/lib/hooks/useDebounce';
import { NominatimResult } from '@/types/NominatimResult';

export const useCityAutocomplete = (query: string, delay = 500) => {
  const [results, setResults] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, delay);

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

  return { results, setResults };
};
