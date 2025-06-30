"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_PASSWORD;
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    //@ts-ignore
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(411).json({
            message: "auth token is required!"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        //@ts-ignore //TODO fix this
        req.userId = decoded.userId;
        next();
    }
    catch (e) {
        res.status(411).json({
            message: "Invalid or exprided token!"
        });
    }
};
exports.authMiddleware = authMiddleware;
