import { Types } from "mongoose";

export interface IBusinessRecord {
  business: string;
  type: Types.ObjectId; // Uses predefined list of business types
  owner: string;
  phone: string;
  email: string;
  parcel: string;
  address: string;
  lastContactDate: Date | null; // Use Date if handling actual Date objects
  outcome: Types.ObjectId;
  notes: string;
  onMarket: boolean;
  price: number | null; // Nullable in case price is unknown
  cashFlow: number | null; // Nullable in case cash flow is unknown
}

export interface IClientBusinessRecord extends IBusinessRecord {
  id: string;
}

export interface IServerBusinessRecord extends IBusinessRecord {
  _id: string;
}
