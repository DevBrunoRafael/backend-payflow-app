import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import * as jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors";

type JwtPayload = {
   _id: string;
};

export const authMiddleware = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { authorization } = req.headers;

   if (!authorization) {
      throw new UnauthorizedError("Usuário não autorizado.");
   }

   const token = authorization.split(" ")[1];
   const { _id } = jwt.verify(
      token,
      process.env.SECRET_KEY ?? ""
   ) as JwtPayload;

   const user = await UserRepository.findOne(_id);

   if (!user) {
      throw new UnauthorizedError("Não autorizado");
   }

   // passa o id do usuário logado para os controladores,
   // para passar dados por completo deve-se alterar o @types
   req.userId = user.id;

   next();
};
