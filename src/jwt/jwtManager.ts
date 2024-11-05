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
  authenticateToken(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      res.sendStatus(401); 
    }
  
    jwt.verify(token as string, this.secretToken, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  }
}
