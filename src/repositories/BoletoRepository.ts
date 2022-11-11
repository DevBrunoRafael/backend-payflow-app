import { StatusBoleto } from "../enum/StatusBoleto";
import Boleto from "../database/schemas/Boleto";

interface BoletoType {
   nomeBoleto: string;
   vencimento: Date;
   valor: string;
   codigo: string;
}

class BoletoRepository {
   async findOne(_id: string) {
      return await Boleto.findById(_id);
   }

   async findAll() {
      return await Boleto.find();
   }

   async findAllPaid() {
      return (await this.findAll()).filter(
         (item) => item.status == StatusBoleto["PAGO"]
      );
   }

   async create(boleto: BoletoType) {
      await Boleto.create(boleto);
   }

   async update(_id: string) {
      await Boleto.findByIdAndUpdate(_id, { status: StatusBoleto.PAGO });
   }

   async deleteOne(_id: string) {
      await Boleto.findByIdAndDelete(_id);
   }
}

export default new BoletoRepository();
