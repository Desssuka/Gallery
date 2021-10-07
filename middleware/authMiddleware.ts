import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
interface IUserAuthRequest extends Request {
    user:string | jwt.JwtPayload
}

export default function (req:IUserAuthRequest, res:Response, next:NextFunction) {
    if (req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.body.authorization.split('')[1]
        if (!token) {
            return res.status(401).json({message: "Not authorized"})
        }
        const decoded = jwt.verify(token, "SO_SECRET_KEY")
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message:"Not authorized"})
    }
}