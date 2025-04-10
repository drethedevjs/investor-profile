import type { IBusinessType } from "@/interfaces/BusinessType";
import type { IBusinessRecord } from "@/interfaces/IBusinessRecord";
import type { IOutcome } from "@/interfaces/Outcome";

export default class BusinessFormData implements IBusinessRecord {
  constructor(
    public id: string = "",
    public business: string = "",
    public type: IBusinessType = { _id: "", name: "" },
    public owner: string = "",
    public parcel: string = "",
    public address: string = "",
    public lastContactDate: Date = new Date(),
    public outcome: IOutcome = { _id: "", name: "" },
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
    this.type = { _id: "", name: "" };
    this.owner = "";
    this.parcel = "";
    this.address = "";
    this.lastContactDate = new Date();
    this.outcome = { _id: "", name: "" };
    this.notes = "";
    this.onMarket = false;
    this.price = null;
    this.cashFlow = null;
  }
}
