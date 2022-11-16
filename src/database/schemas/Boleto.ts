import { StatusBoleto } from "../../enum/StatusBoleto";
import mongoose, { Schema } from "mongoose";

const Boleto = new mongoose.Schema({
   nomeBoleto: {
      type: Schema.Types.String,
      require: true,
   },
   vencimento: {
      type: Schema.Types.Date,
      require: true,
   },
   valor: {
      type: Schema.Types.Number,
      require: true,
   },
   codigo: {
      type: Schema.Types.String,
      unique: true,
      require: true,
   },
   status: {
      type: Schema.Types.String,
      enum: StatusBoleto,
      default: StatusBoleto.PENDENTE,
      require: true,
   },
   created_at: {
      type: Schema.Types.Date,
      default: Date.now(),
      require: true,
   },
});

export default mongoose.model("Boleto", Boleto);
