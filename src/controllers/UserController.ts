import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { BadRequestError } from "../helpers/api-errors";

export class UserController {
   async createUser(req: Request, res: Response) {
      const { nome, email, password } = req.body;

      const emailInUSe = await UserRepository.findUserByEmail(req.params.email);

      if (emailInUSe) {
         throw new BadRequestError("Email em uso.");
      }

      await UserRepository.create({
         nome,
         email,
         password,
      });

      return res.status(201).json({ message: "Usuário cadastrado!" });
   }

   async login(req: Request, res: Response) {
      const { email, password } = req.body;

      const user = await UserRepository.findUserByEmail(email);

      if (!user) {
         throw new BadRequestError("Email não cadastrado.");
      }

      const verifyPassword = await bcrypt.compare(
         password,
         user.password ?? ""
      );

      if (!verifyPassword) {
         throw new BadRequestError("Senha incorreta.");
      }

      const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY ?? "", {
         expiresIn: "7d",
      });

      res.status(200).json({
         user: { nome: user.nome },
         token: token,
      });
   }

   async getTest(req: Request, res: Response) {
      res.status(200).json(req.user);
   }
}
