import express from "express";
import businessRouter from "./src/routes/businessRouter.js";
const app = express();
const port = 2222;

app.use("/api/business", businessRouter);

app.listen(port, () => {
  console.log(`E&P Express app listening on port ${port}`);
});
