import "dotenv/config";
import * as express from "express";
import boletoRoutes from "./routes/BoletoRoutes";
import mongoose from "mongoose";

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose
   .connect(
      `mongodb+srv://${username}:${password}@clusterpayflowapp.9mairl2.mongodb.net/boletos?retryWrites=true&w=majority`
   )
   .then(() => {
      const app = express();

      app.use(express.json());
      app.use("/boletos", boletoRoutes);

      app.listen(3333, () => console.log("Server on http://localhost:3333"));
   })
   .catch((error) => console.log(error));
