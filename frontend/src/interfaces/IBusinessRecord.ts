export interface IBusinessRecord {
  business: string;
  type: BusinessType; // Uses predefined list of business types
  owner: string;
  phone: string;
  email: string;
  parcel: string;
  address: string;
  lastContactDate: Date | null; // Use Date if handling actual Date objects
  outcome: OutcomeType;
  notes: string;
  onMarket: boolean;
  price: number | null; // Nullable in case price is unknown
  cashFlow: number | null; // Nullable in case cash flow is unknown
}

export type OutcomeType = { name: "" };

export type BusinessType = {
  name: string;
};

export const businessTypeArray: string[] = [
  "Laundromat",
  "Property Management",
  "Plumbing",
  "Maintenance",
  "Digital Marketing",
  "Motel",
  "Flooring",
  "Commercial Signage",
  "Self Storage",
  "HVAC Services",
  "Printing and Copying Services",
  "Locksmith",
  "Courier & Delivery Services",
  "Glass Repair and Replacement",
  "Auto Repair",
  "Shuttle Services",
  "Postal Services",
  "Transportation",
  "Car Wash",
];
