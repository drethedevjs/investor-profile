import { Schema, model } from "mongoose";

const BusinessRecordSchema = new Schema(
  {
    business: { type: String, required: true, trim: true },
    address: { type: String, required: false, trim: true },
    phone: { type: String, required: false, trim: true },
    email: { type: String, required: false, trim: true },
    parcel: { type: String, required: false, trim: true },
    type: { type: Schema.Types.ObjectId, ref: "BusinessType", required: true }, // 🔹 Reference to BusinessType schema
    owner: { type: String, required: false, trim: true },
    outcome: { type: Schema.Types.ObjectId, ref: "Outcome", required: false }, // 🔹 Reference to Outcome schema
    lastContactDate: { type: Date, default: null },
    notes: { type: String, required: false, trim: true },
    onMarket: { type: Boolean, default: false },
    price: { type: Number, default: null },
    cashFlow: { type: Number, default: null },
  },
  { timestamps: true }, // automatically adds createdAt and updatedAt fields to your schema
);

const BusinessRecord = model("BusinessRecord", BusinessRecordSchema);
export default BusinessRecord;
