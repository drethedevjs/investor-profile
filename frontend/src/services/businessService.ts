import BusinessRecordDto from "@/classes/BusinessRecordDto";
import type { IBusinessType } from "@/interfaces/BusinessType";
import type { IBusinessRecord } from "@/interfaces/IBusinessRecord";
import type IEPResponse from "@/interfaces/IEPResponse";
import type { IServerBusinessRecord } from "@/interfaces/IServerBusinessRecord";
import type { IOutcome } from "@/interfaces/Outcome";
import axios from "axios";
import moment from "moment";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:2222"
    : "https://investor-profile.vercel.app";

const businessService = {
  getBusinessRecords: async (): Promise<IEPResponse<IBusinessRecord[]>> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/business`);
      let businessRecords = response.data.length ? BusinessRecordDto.fromMany(response.data) : [];

      return {
        isSuccess: true,
        data: businessRecords.sort((a, b) => a.business.localeCompare(b.business)),
        message: "",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        isSuccess: false,
        data: [],
        message: error,
      };
    }
  },
  updateBusinessRecord: async (
    record: IBusinessRecord,
  ): Promise<IEPResponse<IBusinessRecord | null>> => {
    try {
      if (record.lastContactDate) record.lastContactDate = moment(record.lastContactDate).format();

      let updatedServerBusinessRecord = await axios.put(`${BASE_URL}/api/business/update`, record);
      let updatedBusinessRecord = BusinessRecordDto.from(updatedServerBusinessRecord.data);

      return {
        isSuccess: true,
        data: updatedBusinessRecord,
        message: "",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        isSuccess: false,
        data: null,
        message: error,
      };
    }
  },
  saveBusinessRecord: async (
    record: IBusinessRecord,
  ): Promise<IEPResponse<IBusinessRecord | null>> => {
    try {
      if (record.lastContactDate) record.lastContactDate = moment(record.lastContactDate).format();
      let savedServerBusinessRecord: IServerBusinessRecord;
      let savedBusinessRecord: IBusinessRecord;

      console.log("Saving this record:", record);
      savedServerBusinessRecord = await axios.post(`${BASE_URL}/api/business/save`, record);
      savedBusinessRecord = BusinessRecordDto.from(savedServerBusinessRecord);

      return {
        isSuccess: true,
        data: savedBusinessRecord,
        message: "",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        isSuccess: false,
        data: null,
        message: error,
      };
    }
  },
  getOutcomes: async (): Promise<IEPResponse<IOutcome[]>> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/business/outcome`);

      return {
        isSuccess: true,
        data: response.data.sort((a: IOutcome, b: IOutcome) => a.name.localeCompare(b.name)),
        message: "",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        isSuccess: false,
        data: [],
        message: error,
      };
    }
  },
  getTypes: async (): Promise<IEPResponse<IBusinessType[]>> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/business/types`);

      return {
        isSuccess: true,
        data: response.data.sort((a: IBusinessType, b: IBusinessType) =>
          a.name.localeCompare(b.name),
        ),
        message: "",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        isSuccess: false,
        data: [],
        message: error,
      };
    }
  },
  getListData: async () => {
    try {
      const results = await Promise.allSettled([
        businessService.getBusinessRecords(),
        businessService.getOutcomes(),
        businessService.getTypes(),
      ]);

      const resBusinessRecords = results[0].status === "fulfilled" ? results[0].value : null;

      const resOutcomes: IEPResponse<IOutcome[]> | null =
        results[1].status === "fulfilled" ? results[1].value : null;

      const resTypes: IEPResponse<IBusinessType[]> | null =
        results[2].status === "fulfilled" ? results[2].value : null;

      if (!resBusinessRecords || !resBusinessRecords.isSuccess)
        throw new Error("Error fetching business records");

      if (!resOutcomes || !resOutcomes.isSuccess) throw new Error("Error fetching outcomes");

      if (!resTypes || !resTypes.isSuccess) throw new Error("Error fetching types");

      const businessRecords = resBusinessRecords.data;
      const callOutcomes = resOutcomes.data;
      const types = resTypes.data;

      return { businessRecords, callOutcomes, types };
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export default businessService;
