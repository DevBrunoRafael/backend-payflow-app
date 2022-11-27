import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { EmailInUseError } from "../helpers/api-errors";

export class SignUpController {
   async createUser(req: Request, res: Response) {
      const { nome, email, password } = req.body;

      const emailInUse = await UserRepository.findUserByEmail(email);

      if (emailInUse) {
         throw new EmailInUseError(
            "Não foi possivel realizar o cadastro, o email informado já está foi cadastrado."
         );
      }

      await UserRepository.create({
         nome,
         email,
         password,
      });

      return res.status(201).json({ message: "Usuário cadastrado!" });
   }
}
