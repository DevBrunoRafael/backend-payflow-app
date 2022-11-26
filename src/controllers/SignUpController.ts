import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { EmailInUseError } from "../helpers/api-errors";

export class SignUpController {
   async createUser(req: Request, res: Response) {
      const { nome, email, password } = req.body;

      const emailInUSe = await UserRepository.findUserByEmail(req.params.email);

      if (emailInUSe) {
         throw new EmailInUseError("Email em uso.");
      }

      await UserRepository.create({
         nome,
         email,
         password,
      });

      return res.status(201).json({ message: "Usuário cadastrado!" });
   }
}
