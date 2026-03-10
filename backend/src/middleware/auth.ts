import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import ENV from "../utils/config";

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const headers = req.headers.authorization;
        if(!headers){
            return res.status(404).json({
                message: "Authorization header not found"
            });
        }

        const token = headers.split(" ")[1];
        if(token == undefined){
            return res.status(404).json({
                message: "Token not found"
            })
        }

        // throws error if not verify
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
        // console.log("Decoded ", decoded)
        // console.log(decoded.userId);
        req.userId = Number(decoded);
        next();

    } catch (error) {
      return res.status(500).json({
        message: "Malicious tok",
      });
    }
}