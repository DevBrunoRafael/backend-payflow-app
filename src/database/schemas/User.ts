import mongoose, { Schema } from "mongoose";

const User = new mongoose.Schema({
   nome: {
      type: Schema.Types.String,
      require: true,
   },
   email: {
      type: Schema.Types.String,
      unique: true,
      require: true,
   },
   password: {
      type: Schema.Types.String,
      require: true,
   },
});

export default mongoose.model("User", User);
