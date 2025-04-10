import { Types } from "mongoose";
import Business from "../classes/Business.js";
import { IBusinessRecord, IServerBusinessRecord } from "../interfaces/IBusinessRecord.js";
import { IBusinessType } from "../interfaces/IBusinessType.js";
import IEPResponse from "../interfaces/IEPResponse.js";
import { IOutcome } from "../interfaces/IOutcome.js";
import BusinessRecord from "../models/business.js";
import BusinessType from "../models/businessType.js";
import Outcome from "../models/outcome.js";

const businessService = {
  getBusinessById: async (id: string) => {
    try {
      const businessRecords = await BusinessRecord.findById(id).populate([
        {
          path: "outcome",
        },
        {
          path: "type",
        },
      ]);

      return {
        isSuccess: true,
        data: businessRecords,
        message: "",
      };
    } catch (err: any) {
      console.error(err);
      return {
        isSuccess: false,
        data: null,
        message: err,
      };
    }
  },
  getBusinesses: async () => {
    try {
      const businessRecords = await BusinessRecord.find<IBusinessRecord>().populate([
        {
          path: "outcome",
        },
        {
          path: "type",
        },
      ]);

      return {
        isSuccess: true,
        data: businessRecords,
        message: "",
      };
    } catch (err: any) {
      console.error(err);
      return {
        isSuccess: false,
        data: null,
        message: err,
      };
    }
  },
  updateBusinessRecord: async (
    record: IServerBusinessRecord,
  ): Promise<IEPResponse<IBusinessRecord | null>> => {
    const business = Business.fromModel(record);
    try {
      let businessRecord = await BusinessRecord.findByIdAndUpdate(
        new Types.ObjectId(business._id),
        business,
        { new: true },
      ).populate([
        {
          path: "outcome",
        },
        {
          path: "type",
        },
      ]);

      if (!businessRecord) throw new Error("Cannot find business record.");

      console.log(`${business.business} business record was updated!`);

      return {
        isSuccess: true,
        data: Business.fromModel(businessRecord),
        message: "",
      };
    } catch (err: any) {
      return {
        isSuccess: false,
        data: null,
        message: err,
      };
    }
  },
  saveBusiness: async (record: IBusinessRecord) => {
    const businessRecord = new BusinessRecord(record);
    await businessRecord.save();
  },
  saveBusinessTypes: async (records: IBusinessType[]) => {
    try {
      await BusinessType.insertMany(records);

      return {
        isSuccess: true,
        data: null,
        message: "Worked",
      };
    } catch (err: any) {
      console.error(err);
      return {
        isSuccess: false,
        data: null,
        message: err,
      };
    }
  },
  getOutcomeById: async (id: string): Promise<IEPResponse<IOutcome | null>> => {
    try {
      let outcome = await Outcome.findById<IOutcome>(id);

      if (!outcome) throw new Error(`Could not find outcome with id: ${id};`);

      return {
        isSuccess: true,
        data: outcome,
        message: "Worked",
      };
    } catch (err: any) {
      console.error(err);
      return {
        isSuccess: false,
        data: null,
        message: err,
      };
    }
  },
  getBusinessTypeById: async (id: string): Promise<IEPResponse<IBusinessType | null>> => {
    try {
      let type = await BusinessType.findById<IBusinessType>(id);

      if (!type) throw new Error(`Could not find business type with id: ${id};`);

      return {
        isSuccess: true,
        data: type,
        message: "Worked",
      };
    } catch (err: any) {
      console.error(err);
      return {
        isSuccess: false,
        data: null,
        message: err,
      };
    }
  },
  getOutcomes: async () => {
    try {
      let outcomes = await Outcome.find();

      return {
        isSuccess: true,
        data: outcomes,
        message: "Worked",
      };
    } catch (err: any) {
      console.error(err);
      return {
        isSuccess: false,
        data: null,
        message: err,
      };
    }
  },
  getTypes: async () => {
    try {
      const types = await BusinessType.find();

      return {
        isSuccess: true,
        data: types,
        message: "Worked",
      };
    } catch (err: any) {
      console.error(err);
      return {
        isSuccess: false,
        data: null,
        message: err,
      };
    }
  },
};

export default businessService;
