import { Router } from "express";
import { BoletoController } from "../controllers/BoletoController";

const boletoRoutes = Router();
const boletoController = new BoletoController();

boletoRoutes.post("/", boletoController.criarNovoBoleto);
boletoRoutes.get("/todos", boletoController.listarTodosBoletos);
boletoRoutes.get("/pagos", boletoController.listarBoletosPagos);
boletoRoutes.get("/:_id", boletoController.buscarBoletoPorId);
boletoRoutes.put("/:_id", boletoController.marcarComoPago);
boletoRoutes.delete("/:_id", boletoController.deletarBoleto);

export default boletoRoutes;
