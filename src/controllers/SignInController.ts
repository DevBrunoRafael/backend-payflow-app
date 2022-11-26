import { Request, Response } from "express";
import {
   BadRequestError,
   NotFoundError,
   UnauthorizedError,
} from "../helpers/api-errors";
import UserRepository from "../repositories/UserRepository";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export class SignInController {
   async signIn(req: Request, res: Response) {
      console.log("bateu");

      const { email, password } = req.body;

      const user = await UserRepository.findUserByEmail(email);

      if (!user) {
         throw new NotFoundError("Email não cadastrado.");
      }

      const verifyPassword = await bcrypt.compare(
         password,
         user.password ?? ""
      );

      if (!verifyPassword) {
         throw new BadRequestError("Senha incorreta.");
      }

      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY ?? "", {
         expiresIn: "7d",
      });

      res.status(200).json({
         useId: user._id,
         token: token,
      });
   }

   async authenticatedUser(req: Request, res: Response) {
      console.log("route access");

      const user = await UserRepository.findOne(req.params._id);

      if (!user) {
         throw new UnauthorizedError("Não autorizado");
      }

      return res.status(200).json({ nome: user.nome });
   }
}
