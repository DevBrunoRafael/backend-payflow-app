import User from "../database/schemas/User";
import * as bcrypt from "bcrypt";

interface UserType {
   nome: string;
   email: string;
   password: string;
}

class UserRepository {
   async create(user: UserType) {
      const hashPassword = await bcrypt.hash(user.password, 8);
      await User.create({
         ...user,
         password: hashPassword,
      });
   }

   async findUserByEmail(email: string) {
      const user = await User.findOne({ email }).exec();
      return user;
   }

   async findOne(_id: string) {
      return await User.findById(_id);
   }
}

export default new UserRepository();
