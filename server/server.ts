import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import businessRouter from "./src/routes/businessRouter.js";
dotenv.config();

mongoose.set("strictQuery", false);

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Connected to database!");
  } catch (error) {
    console.log("Database not connected!", error);
  }
}

await connect();

const app = express();
const port = 2222;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://www.eleventhandpemberton.com",
    "https://eleventhandpemberton.com"
  ],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/business", businessRouter);
app.listen(port, () => {
  console.log(`E&P Express app listening on port ${port}`);
});

export default app;
