export declare global {
   declare namespace Express {
      interface Request {
         user: string;
      }
   }
}
