import { AppDataSource } from "../data-source";
import { Boleto } from "../models/Boleto";

export const boletoRepository = AppDataSource.getMongoRepository(Boleto);
