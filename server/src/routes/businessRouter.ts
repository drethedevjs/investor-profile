import express from "express";
import businessController from "../../src/controllers/businessController.js";

const router = express.Router();

router.get("/", businessController.getBusinessRecords);
router.post("/save", businessController.saveBusinessRecord);
router.put("/update", businessController.updateBusinessRecord);
router.get("/outcome", businessController.getOutcomes);
router.get("/types", businessController.getTypes);

export default router;
