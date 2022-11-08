import { Request, Response } from "express";
import * as express from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
   res.status(200).json({ message: "Rota funcionando" });
});

app.listen(3333, () => console.log("Server on http://localhost:3333/"));
