import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

export const AppDataSource = new DataSource({
   type: "mongodb",
   url: `mongodb+srv://${username}:${password}@clusterpayflowapp.9mairl2.mongodb.net/boletos?retryWrites=true&w=majority`,
   useNewUrlParser: true,
   useUnifiedTopology: true,
   logging: true,
   synchronize: true,
   entities: [`${__dirname}/**/models/*.{ts,js}`],
   migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
