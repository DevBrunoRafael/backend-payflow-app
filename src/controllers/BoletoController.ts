import { StatusBoleto } from "../enum/StatusBoleto";
import { Request, Response } from "express";
import Boleto from "../database/schemas/Boleto";

export class BoletoController {
   async listarTodosBoletos(req: Request, res: Response) {
      try {
         const boletos = await Boleto.find();
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
         const { _id } = req.params;

         const boleto = await Boleto.findById(_id);
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

         await Boleto.create({
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
         const { _id } = req.params;

         await Boleto.findByIdAndDelete(_id);
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
         const { _id } = req.params;

         await Boleto.findByIdAndUpdate(_id, {
            status: StatusBoleto.PAGO,
         });

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
         const boletos = await Boleto.find();
         const boletosPagos = boletos.filter(
            (item) => item.status == StatusBoleto["PAGO"]
         );

         return res.status(200).json(boletosPagos);
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            message: "erro ao buscar todos os boletos",
         });
      }
   }
}
