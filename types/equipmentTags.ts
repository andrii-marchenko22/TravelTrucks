export const equipmentTags = [
  'ac',
  'automatic',
  'kitchen',
  'tv',
  'bathroom',
  'petrol',
  'radio',
  'refrigerator',
  'microwave',
  'gas',
  'water',
] as const;

export type EquipmentTag = (typeof equipmentTags)[number];
