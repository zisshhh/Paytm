import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config();
const JWT_SECRET = process.env.JWT_PASSWORD as string

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    
    // @ts-ignore
    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(411).json({
            message: "auth token is required!"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        // @ts-ignore //TODO fix this
        req.userId = decoded.userId;
        next();
    } catch (e) {
        res.status(411).json({
            message: "Invalid or exprided token!"
        })
    }
}