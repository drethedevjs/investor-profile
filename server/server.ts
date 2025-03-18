import cors from "cors";
import express from "express";
import { ParamsDictionary, Request, Response } from "express-serve-static-core";
import { IncomingMessage, ServerResponse } from "http";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import businessRouter from "./src/routes/businessRouter.js";
const app = express();
const port = 2222;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://www.eleventhandpemberton.com",
    "https://eleventhandpemberton.com"
  ],
  methods: ["GET", "PUT", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use("/api/business", businessRouter);
app.listen(port, () => {
  console.log(`E&P Express app listening on port ${port}`);
});

// Wrap Express in Vercel handler
export default function handler(
  req:
    | Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
    | IncomingMessage,
  res:
    | Response<any, Record<string, any>, number>
    | ServerResponse<IncomingMessage>
) {
  return app(req, res);
}
