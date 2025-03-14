import type { IEPSimpleResponse } from "@/interfaces/IEPResponse";
import type ISendEmailRequestBody from "@/interfaces/ISendEmailRequestBody.ts";
import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:2222"
    : "https://csra-web-express-server.vercel.app";

const emailService = {
  sendEmail: async (formData: ISendEmailRequestBody): Promise<IEPSimpleResponse> => {
    console.log("Environment", import.meta.env.MODE);

    try {
      await axios.post(`${BASE_URL}/api/email/send-ep`, formData);

      return {
        isSuccess: true,
        message: "Email sent!",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error,
      };
    }
  },
};

export default emailService;
