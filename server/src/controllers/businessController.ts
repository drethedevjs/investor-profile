import { NextFunction, Request, Response } from "express";
import businessService from "../services/businessService.js";

const businessController = {
  getBusinessRecords: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await businessService.getBusinesses();

      if (!response.isSuccess) throw new Error(response.message);
      res.send(response.data);
    } catch (err: any) {
      console.error(err);
      res.send(err);
    }
  },
  saveBusinessRecord: async (req: Request, res: Response, next: NextFunction) => {
    try {
      throw new Error("Not yet in use.");
    } catch (err: any) {
      console.error(err);
      res.send(err);
    }
  },
  getOutcomes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await businessService.getOutcomes();

      if (!response.isSuccess) throw new Error(response.message);
      res.send(response.data);
    } catch (err: any) {
      console.error(err);
      res.send(err);
    }
  },
  getTypes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await businessService.getTypes();

      if (!response.isSuccess) throw new Error(response.message);
      res.send(response.data);
    } catch (err: any) {
      console.error(err);
      res.send(err);
    }
  },
};

export default businessController;
