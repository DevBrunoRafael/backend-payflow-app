import { Request, Response } from "express";
import BoletoRepository from "../repositories/BoletoRepository";

export class BoletoController {
   async listarTodosBoletos(req: Request, res: Response) {
      const boletos = await BoletoRepository.findAll();
      return res.status(200).json(boletos);
   }

   async buscarBoletoPorId(req: Request, res: Response) {
      const boleto = await BoletoRepository.findOne(req.params._id);
      return res.status(200).json(boleto);
   }

   async criarNovoBoleto(req: Request, res: Response) {
      const { nomeBoleto, vencimento, valor, codigo } = req.body;
      await BoletoRepository.create({
         nomeBoleto,
         vencimento,
         valor,
         codigo,
      });
      return res.status(201).json({ message: "Boleto cadastrado!" });
   }

   async deletarBoleto(req: Request, res: Response) {
      await BoletoRepository.deleteOne(req.params._id);
      return res.status(200).json({ message: "Boleto deletado!" });
   }

   async marcarComoPago(req: Request, res: Response) {
      await BoletoRepository.update(req.params._id);
      return res.status(200).json({ message: "Boleto pago!" });
   }

   async listarBoletosPagos(req: Request, res: Response) {
      const boletosPagos = await BoletoRepository.findAllPaid();
      return res.status(200).json(boletosPagos);
   }
}
