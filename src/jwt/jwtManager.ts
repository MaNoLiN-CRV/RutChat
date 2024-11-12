import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class jwtManager {
   secretToken: string;

   constructor() {
    dotenv.config();
    this.secretToken = process.env.TOKEN_SECRET as string;
   }
   /**
    * Creates a new jwt
    * @param username 
    * @returns 
    */
   generateAccessToken(username: string) : string {
    return jwt.sign(username, this.secretToken);
  }
  /**
   * 
   * @param req Request
   * @param res Response
   * @param next Next function will be executed if the token is valid
   */
  authenticateToken(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies; 
    const token = cookies.authToken; 

    if (!token) {
        return res.status(401).send("SERVER BLOST SECURITY: NOT LOGGED IN :("); 
    }
    jwt.verify(token, this.secretToken, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403);
        }
        console.log("next");
        next();
    });
}
}
