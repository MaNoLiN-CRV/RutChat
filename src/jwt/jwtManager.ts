import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
export class jwtManager {
    static secretToken: string | undefined;
   constructor() {
    dotenv.config();
    jwtManager.secretToken = process.env.TOKEN_SECRET;
   }
   /**
    * Creates a new jwt
    * @param username 
    * @returns 
    */
   static generateAccessToken(username: string) : string {
    return jwt.sign(username, jwtManager.secretToken, { expiresIn: '100000s' });
  }
  /**
   * 
   * @param req Request
   * @param res Response
   * @param next Next function will be executed if the token is valid
   */
  static authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      res.sendStatus(401); 
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: Error, user : string) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  }
}
