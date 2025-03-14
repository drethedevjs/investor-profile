import type { IBusinessRecord } from "@/interfaces/IBusinessRecord";
import type Outcome from "./Outcome";

export default class BusinessFormData implements IBusinessRecord {
  constructor(
    public business: string = "",
    public type:
      | "Plumbing"
      | "Property Management"
      | "Maintenance"
      | "Digital Marketing"
      | "Laundromat"
      | "Flooring"
      | "Commercial Signage"
      | "Self Storage"
      | "HVAC Services"
      | "Printing and Copying Services"
      | "Locksmith"
      | "Courier & Delivery Services"
      | "Glass Repair and Replacement"
      | "Shuttle Services"
      | "Postal Services"
      | "Auto Repair"
      | "Transportation"
      | "Car Wash"
      | null = null,
    public owner: string = "",
    public parcel: string = "",
    public address: string = "",
    public lastContactDate: Date | null = null,
    public outcome: string | Outcome | null = "",
    public notes: string = "",
    public onMarket: boolean = false,
    public price: number | null = null,
    public cashFlow: number | null = null,
    public phone: string = "",
    public email: string = "",
  ) {}

  clear() {
    this.phone = "";
    this.email = "";
    this.business = "";
    this.type = null;
    this.owner = "";
    this.parcel = "";
    this.address = "";
    this.lastContactDate = null;
    this.outcome = "";
    this.notes = "";
    this.onMarket = false;
    this.price = null;
    this.cashFlow = null;
  }
}
