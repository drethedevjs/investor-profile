import type { BusinessType, IBusinessRecord, OutcomeType } from "@/interfaces/IBusinessRecord";

export default class BusinessFormData implements IBusinessRecord {
  constructor(
    public business: string = "",
    public type: BusinessType = { name: "" },
    public owner: string = "",
    public parcel: string = "",
    public address: string = "",
    public lastContactDate: Date | null = null,
    public outcome: OutcomeType = { name: "" },
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
    this.type = { name: "" };
    this.owner = "";
    this.parcel = "";
    this.address = "";
    this.lastContactDate = null;
    this.outcome = { name: "" };
    this.notes = "";
    this.onMarket = false;
    this.price = null;
    this.cashFlow = null;
  }
}
