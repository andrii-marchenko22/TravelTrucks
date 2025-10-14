export type VehicleIcon = {
  id: string;
  label: string;
};

export const vehicleIcons: VehicleIcon[] = [
  { id: 'AC', label: 'AC' },
  { id: 'automatic', label: 'Automatic' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'TV', label: 'TV' },
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'petrol', label: 'Petrol' },
  { id: 'radio', label: 'Radio' },
  { id: 'refrigerator', label: 'Refrigerator' },
  { id: 'microwave', label: 'Microwave' },
  { id: 'gas', label: 'Gas' },
  { id: 'water', label: 'Water' },
];

export const vehicleType: VehicleIcon[] = [
  { id: 'panelTruck', label: 'Van' },
  { id: 'fullyIntegrated', label: 'Fully Integrated' },
  { id: 'alcove', label: 'Alcove' },
];
