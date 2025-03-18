import cors from "cors";
import express from "express";
import businessRouter from "./src/routes/businessRouter.js";
const app = express();
const port = 2222;

const corsOptions = {
  origin: "*",
  // origin: [
  //   "http://localhost:5173",
  //   "https://www.eleventhandpemberton.com",
  //   "https://eleventhandpemberton.com"
  // ],
  methods: ["GET", "PUT", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use("/api/business", businessRouter);
app.listen(port, () => {
  console.log(`E&P Express app listening on port ${port}`);
});
