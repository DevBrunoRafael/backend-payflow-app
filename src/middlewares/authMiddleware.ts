import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import * as jwt from "jsonwebtoken";

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
      res.status(401).send();
      throw new Error("Não autorizado");
   }

   const token = authorization.split(" ")[1];
   const { _id } = jwt.verify(
      token,
      process.env.SECRET_KEY ?? ""
   ) as JwtPayload;

   const user = await UserRepository.findOne(_id);

   if (!user) {
      res.status(403).json({ message: "Email inválido" });
      throw new Error();
   }

   req.user = user.id;

   next();
};
