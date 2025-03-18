import type { IBusinessRecord } from "@/interfaces/IBusinessRecord";
import type IEPResponse from "@/interfaces/IEPResponse";
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
};

export default businessService;
