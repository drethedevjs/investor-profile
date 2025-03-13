import express from "express";
import businessController from "../../src/controllers/businessController.js";

const router = express.Router();

router.get("/", businessController.getBusinessRecords);

export default router;
