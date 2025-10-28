import "./instrument"

import dotenv from "dotenv";
import * as path from "path";
import express from "express";
import * as Sentry from "@sentry/node"

import routes from "./routes";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(express.json());

app.use("/", routes); 

Sentry.setupExpressErrorHandler(app);

// eslint-disable-next-line
app.use(function onError(err:Error, _req:any, res:any, _next:any) {
  console.error("Error :", err.message);
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});
const PORT = process.env.PORT || 3000;
console.log("Actions")
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
