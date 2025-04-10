import type { IBusinessType } from "@/interfaces/BusinessType";
import type { IOutcome } from "@/interfaces/Outcome";

export interface IServerBusinessRecord {
  _id: string;
  business: string;
  type: IBusinessType; // Uses predefined list of business types
  owner: string;
  phone: string;
  email: string;
  parcel: string;
  address: string;
  lastContactDate: Date; // Use Date if handling actual Date objects
  outcome: IOutcome;
  notes: string;
  onMarket: boolean;
  price: number | null; // Nullable in case price is unknown
  cashFlow: number | null; // Nullable in case cash flow is unknown
}
