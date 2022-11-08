import { Router } from "express";
import { BoletoController } from "../controllers/BoletoController";

const boletoRoutes = Router();
const boletoController = new BoletoController();

boletoRoutes.post("/", boletoController.createBoleto);
boletoRoutes.get("/all", boletoController.findAllBoletos);
boletoRoutes.get("/", boletoController.findBoletoById);
boletoRoutes.delete("/", boletoController.deleteBoleto);

export default boletoRoutes;
