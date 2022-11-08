import { StatusBoleto } from "../enum/StatusBoleto";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Boleto {
   @ObjectIdColumn()
   _id: string;

   @Column()
   nomeBoleto: string;

   @Column()
   vencimento: Date;

   @Column()
   valor: number;

   @Column()
   codigo: string;

   @Column() //  { type: "enum", enum: StatusBoleto }
   status: StatusBoleto;

   @Column()
   created_at: Date;
}
