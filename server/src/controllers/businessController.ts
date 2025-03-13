import { NextFunction, Request, Response } from "express";
import businessRecords from "../../src/data/businessRecords.js";

const businessController = {
  getBusinessRecords: (req: Request, res: Response, next: NextFunction) => {
    res.send(businessRecords);
  },
};

export default businessController;
