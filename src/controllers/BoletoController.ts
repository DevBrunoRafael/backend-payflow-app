import { Request, Response } from "express";
import BoletoRepository from "../repositories/BoletoRepository";

export class BoletoController {
   async listarTodosBoletos(req: Request, res: Response) {
      try {
         const boletos = await BoletoRepository.findAll();
         return res.status(200).json(boletos);
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            message: "erro ao buscar todos os boletos",
         });
      }
   }

   async buscarBoletoPorId(req: Request, res: Response) {
      try {
         const boleto = await BoletoRepository.findOne(req.params._id);
         return res.status(200).json(boleto);
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            message: "erro ao buscar boleto por id",
         });
      }
   }

   async criarNovoBoleto(req: Request, res: Response) {
      try {
         const { nomeBoleto, vencimento, valor, codigo } = req.body;
         await BoletoRepository.create({
            nomeBoleto,
            vencimento,
            valor,
            codigo,
         });
         return res.status(201).json({
            message: "Boleto cadastrado!",
         });
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            message: "erro ao cadastar boleto",
         });
      }
   }

   async deletarBoleto(req: Request, res: Response) {
      try {
         await BoletoRepository.deleteOne(req.params._id);
         return res.status(200).json({
            message: "Boleto deletado!",
         });
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            message: "erro ao deletar boleto",
         });
      }
   }

   async marcarComoPago(req: Request, res: Response) {
      try {
         await BoletoRepository.update(req.params._id);
         return res.status(200).json({
            message: "Boleto pago!",
         });
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            message: "erro ao atualizar status do boleto",
         });
      }
   }

   async listarBoletosPagos(req: Request, res: Response) {
      try {
         const boletosPagos = await BoletoRepository.findAllPaid();
         return res.status(200).json(boletosPagos);
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            message: "erro ao buscar todos os boletos",
         });
      }
   }
}
