import { IBusinessRecord } from "../interfaces/IBusinessRecord.js";
import { IBusinessType } from "../interfaces/IBusinessType.js";
import BusinessRecord from "../models/business.js";
import BusinessType from "../models/businessType.js";
import Outcome from "../models/outcome.js";

const businessService = {
  getBusinesses: async () => {
    try {
      const businessRecords = await BusinessRecord.find().populate([
        {
          path: "outcome",
          select: "name -_id",
        },
        {
          path: "type",
          select: "name -_id",
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
  saveBusiness: async (record: IBusinessRecord) => {
    const businessRecord = new BusinessRecord(record);
    await businessRecord.save();
  },
  saveBusinesses: async (records: IBusinessRecord[]) => {
    try {
      await BusinessRecord.insertMany(records);

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
