import { StatusBoleto } from "../enum/StatusBoleto";
import Boleto from "../database/schemas/Boleto";

interface BoletoType {
   nomeBoleto: string;
   vencimento: Date;
   valor: string;
   codigo: string;
   user: string;
}

class BoletoRepository {
   async findOne(_id: string, userId: string) {
      return await Boleto.findById(_id).where("user").equals(userId);
   }

   async findAll(userId: string) {
      return await Boleto.find().where("user").equals(userId);
   }

   async findAllPaid(userId: string) {
      return await Boleto.find()
         .where("status")
         .equals(StatusBoleto["PAGO"])
         .where("user")
         .equals(userId);
   }

   async create(boleto: BoletoType) {
      await Boleto.create(boleto);
   }

   async update(_id: string, userId: string) {
      await Boleto.findByIdAndUpdate(_id, { status: StatusBoleto.PAGO })
         .where("user")
         .equals(userId);
   }

   async deleteOne(_id: string, userId: string) {
      await Boleto.findByIdAndDelete(_id).where("user").equals(userId);
   }

   async exists(codigo: string) {
      return await Boleto.findOne({ codigo }).exec();
   }
}

export default new BoletoRepository();
