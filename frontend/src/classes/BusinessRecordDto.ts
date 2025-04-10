import type { IBusinessRecord } from "@/interfaces/IBusinessRecord";
import type { IServerBusinessRecord } from "@/interfaces/IServerBusinessRecord";

export default class BusinessRecordDto implements IBusinessRecord {
  public id: string = "";
  public business: string = "";
  public type: any;
  public owner: string = "";
  public phone: string = "";
  public email: string = "";
  public parcel: string = "";
  public address: string = "";
  public lastContactDate: Date | null = null;
  public outcome: any;
  public notes: string = "";
  public onMarket: boolean = false;
  public price: number | null = null;
  public cashFlow: number | null = null;

  constructor(record: IServerBusinessRecord) {
    if (record) {
      this.id = record._id;
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
  }

  static from(record: IServerBusinessRecord): BusinessRecordDto {
    return new BusinessRecordDto(record);
  }

  static fromMany(records: IServerBusinessRecord[]): BusinessRecordDto[] {
    return records?.map(this.from);
  }
}
