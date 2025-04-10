import type { IClientBusinessRecord } from "@/interfaces/IBusinessRecord.js";
import { Types } from "mongoose";

export default class BusinessRecordDto {
  public _id: string = "";
  public business: string = "";
  public type: Types.ObjectId = new Types.ObjectId();
  public owner: string = "";
  public phone: string = "";
  public email: string = "";
  public parcel: string = "";
  public address: string = "";
  public lastContactDate: Date | null = null;
  public outcome: Types.ObjectId = new Types.ObjectId();
  public notes: string = "";
  public onMarket: boolean = false;
  public price: number | null = null;
  public cashFlow: number | null = null;

  constructor(public record: IClientBusinessRecord) {
    this._id = record.id;
    this.business = record.business;
    this.type = record.type;
    this.owner = record.owner;
    this.phone = record.phone;
    this.email = record.email;
    this.parcel = record.parcel;
    this.address = record.address;
    this.lastContactDate = record.lastContactDate;
    this.outcome = record.outcome;
    this.notes = record.notes;
    this.onMarket = record.onMarket;
    this.price = null;
    this.cashFlow = null;
  }

  static fromModel(record: any): BusinessRecordDto {
    return new BusinessRecordDto(record);
  }
}
