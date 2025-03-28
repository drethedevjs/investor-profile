import BusinessType from "../classes/BusinessType.js";
import type Outcome from "../classes/Outcome.js";

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

export type OutcomeType = (typeof Outcome)[keyof typeof Outcome];

// Predefined list of common businesses to acquire
// export type BusinessType =
//   | "Laundromat"
//   | "Property Management"
//   | "Plumbing"
//   | "Maintenance"
//   | "Digital Marketing"
//   | "Flooring"
//   | "Commercial Signage"
//   | "Motel"
//   | "Self Storage"
//   | "HVAC Services"
//   | "Printing and Copying Services"
//   | "Locksmith"
//   | "Courier & Delivery Services"
//   | "Glass Repair and Replacement"
//   | "Auto Repair"
//   | "Shuttle Services"
//   | "Postal Services"
//   | "Transportation"
//   | "Car Wash";
