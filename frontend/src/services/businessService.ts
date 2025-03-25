import type { IBusinessRecord } from "@/interfaces/IBusinessRecord";
import type IEPResponse from "@/interfaces/IEPResponse";
import type { BusinessTypeResponse } from "@/types/BusinessTypeResponse";
import type { OutcomeResponse } from "@/types/OutcomeResponse";
import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:2222"
    : "https://investor-profile.vercel.app";
// : "https://eleventhandpemberton.com";

const businessService = {
  getBusinessRecords: async (): Promise<IEPResponse<IBusinessRecord[]>> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/business`);

      return {
        isSuccess: true,
        data: response.data,
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
  saveBusinessRecord: async (): Promise<IEPResponse<IBusinessRecord[]>> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/business`);

      return {
        isSuccess: true,
        data: response.data,
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
  getOutcomes: async (): Promise<IEPResponse<OutcomeResponse[]>> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/business/outcome`);

      return {
        isSuccess: true,
        data: response.data,
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
  getTypes: async (): Promise<IEPResponse<BusinessTypeResponse[]>> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/business/types`);

      return {
        isSuccess: true,
        data: response.data,
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
      const resOutcomes: IEPResponse<OutcomeResponse[]> | null =
        results[1].status === "fulfilled" ? results[1].value : null;
      const resTypes: IEPResponse<BusinessTypeResponse[]> | null =
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
