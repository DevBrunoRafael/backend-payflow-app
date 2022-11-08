import * as express from "express";
import boletoRoutes from "./routes/BoletoRoutes";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
   .then(() => {
      const app = express();

      app.use(express.json());
      app.use("/boletos", boletoRoutes);

      app.listen(3333, () => console.log("Server on http://localhost:3333/"));
   })
   .catch((error) => console.log(error));
