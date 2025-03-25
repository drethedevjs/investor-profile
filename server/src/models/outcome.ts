import { Schema, model } from "mongoose";

const OutcomeSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Outcome = model("Outcome", OutcomeSchema);

export default Outcome;
