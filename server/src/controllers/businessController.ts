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
  updateBusinessRecord: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const business = await businessService.updateBusinessRecord(req.body);
      if (!business.isSuccess)
        throw new Error(`Problem retrieving business record: ${req.body.business}`);
      if (!business.data) throw new Error(`Cannot find business with id: ${req.body.id}`);

      res.status(200).json(business.data);
    } catch (err: any) {
      console.error(err);
      res.status(400).json({
        isSuccess: false,
        message: err instanceof Error ? err.message : "Unknown error occurred",
        code: "BUSINESS_RECORD_ERROR",
      });
    }
  },
  saveBusinessRecord: async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     console.log("Biz to save:", req.body);
    //     const bizRec = req.body;
    //     if (!bizRec.outcome || !bizRec.type) throw new Error("Missing outcome id or type id.");
    //     const outcome = await businessService.getOutcomeById(bizRec.outcome);
    //     const businessType = await businessService.getBusinessTypeById(bizRec.type);
    //     if (!businessType.data) throw new Error(`Cannot find type with id: ${bizRec.type}`);
    //     if (!outcome.data) throw new Error(`Cannot find outcome with id: ${bizRec.outcome}`);
    //     console.log("Outcome:", outcome);
    //     console.log("business Type:", businessType);
    //     const businessRecord = new BusinessRecord(
    //       bizRec.id,
    //       bizRec.business,
    //       businessType.data._id,
    //       bizRec.owner,
    //       bizRec.phone,
    //       bizRec.email,
    //       bizRec.parcel,
    //       bizRec.address,
    //       bizRec.lastContactDate,
    //       outcome.data._id,
    //       bizRec.notes,
    //       bizRec.onMarket,
    //       bizRec.price,
    //       bizRec.cashFlow,
    //     );
    //     console.log("my new biz record class", businessRecord);
    //     // await businessService.saveBusiness(req.body);
    //     res.send("Saved!");
    //   } catch (err: any) {
    //     console.error(err);
    //     res.send(err);
    //   }
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
