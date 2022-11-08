import { StatusBoleto } from "../enum/StatusBoleto";
import { Request, Response } from "express";
import { boletoRepository } from "../repositories/BoletoRepository";

export class BoletoController {
   async createBoleto(request: Request, response: Response) {
      try {
         const { nomeBoleto, vencimento, valor, codigo } = request.body;

         const novoBoleto = boletoRepository.create({
            nomeBoleto,
            vencimento,
            valor,
            codigo,
            status: StatusBoleto.PENDENTE,
            created_at: new Date(Date.now()),
         });

         await boletoRepository.save(novoBoleto);
         return response.status(201).json(novoBoleto);
      } catch (error) {
         console.log(error);
         return response.status(500).json({
            message: "erro ao cadastar boleto",
         });
      }
   }

   async deleteBoleto(request: Request, response: Response) {
      try {
         const { _id } = request.params;

         await boletoRepository.delete(_id);
         return response.status(200).json();
      } catch (error) {
         console.log(error);
         return response.status(500).json({
            message: "erro ao deletar boleto",
         });
      }
   }

   async findAllBoletos(request: Request, response: Response) {
      try {
         const boletos = await boletoRepository.find();
         return response.status(200).json(boletos);
      } catch (error) {
         console.log(error);
         return response.status(500).json({
            message: "erro ao buscar todos os boletos",
         });
      }
   }

   async findBoletoById(request: Request, response: Response) {
      try {
         const { _id } = request.params;

         const boleto = await boletoRepository.findOneBy(_id);
         return response.status(200).json(boleto);
      } catch (error) {
         console.log(error);
         return response.status(500).json({
            message: "erro ao buscar todos os boletos",
         });
      }
   }
}
