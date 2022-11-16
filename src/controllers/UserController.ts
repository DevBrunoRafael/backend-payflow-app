import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export class UserController {
   async createUser(req: Request, res: Response) {
      try {
         const { nome, email, password } = req.body;

         const emailInUSe = await UserRepository.findUserByEmail(
            req.params.email
         );
         if (emailInUSe) {
            res.status(403).json({ message: "Email em uso" });
            throw new Error();
         }

         await UserRepository.create({
            nome,
            email,
            password,
         });
         res.status(201).json({
            message: "Usuário cadastrado!",
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            message: "Erro ao criar usuário!",
         });
      }
   }

   async login(req: Request, res: Response) {
      try {
         const { email, password } = req.body;

         const user = await UserRepository.findUserByEmail(email);

         if (!user) {
            res.status(403).json({ message: "Email inválido" });
            throw new Error();
         }

         const verifyPassword = await bcrypt.compare(
            password,
            user.password ?? ""
         );

         console.log(user.password);
         console.log(verifyPassword);

         if (!verifyPassword) {
            // concertar validação do password
            res.status(403).json({ message: "Senha inválida" });
            throw new Error();
         }

         const token = jwt.sign(
            { _id: user.id },
            process.env.SECRET_KEY ?? "",
            { expiresIn: "7d" }
         );

         res.status(200).json({
            user: { nome: user.nome },
            token: token,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: "Erro ao logar" });
      }
   }

   async getTest(req: Request, res: Response) {
      try {
         res.status(200).json(req.user);
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: "Usuáio não autorizado" });
      }
   }
}
