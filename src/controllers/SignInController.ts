import "dotenv/config";
import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import UserRepository from "../repositories/UserRepository";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export class SignInController {
   async signIn(req: Request, res: Response) {
      console.log("bateu no signin");

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
}
