import "express-async-errors";
import "dotenv/config";
import * as express from "express";
import boletoRoutes from "./routes/BoletoRoutes";
import authRoutes from "./routes/AuthRoutes";
import mongoose from "mongoose";
import { errorMiddleware } from "./middlewares/errorsMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose
   .connect(
      `mongodb+srv://${username}:${password}@clusterpayflowapp.9mairl2.mongodb.net/boletos?retryWrites=true&w=majority`
   )
   .then(() => {
      const app = express();

      app.use(express.json());
      app.use("/auth", authRoutes);
      app.use("/boletos", authMiddleware, boletoRoutes); // rotas que necessitam de autorização
      app.use(errorMiddleware);

      app.listen(3333, () => console.log("Server on 🚀"));
   })
   .catch((error) => console.log(error));
