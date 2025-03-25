import { Schema, model } from "mongoose";

const BusinessTypeSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const BusinessType = model("BusinessType", BusinessTypeSchema);

export default BusinessType;
