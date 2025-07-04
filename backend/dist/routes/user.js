"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("../middleware");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_PASSWORD;
const userRouter = (0, express_1.Router)();
const signupBody = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(10),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string()
});
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = signupBody.safeParse(req.body);
        if (!parsed.success) {
            res.status(411).json({
                message: "email already taken or incorrect credentials",
                error: parsed.error
            });
            return;
        }
        ;
        const existingUser = yield db_1.UserModel.findOne({
            username: req.body.username
        });
        if (existingUser) {
            res.status(411).json({
                message: "User alredy exist!"
            });
        }
        ;
        const user = yield db_1.UserModel.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        const userId = user._id;
        const balance = yield db_1.AccountModel.create({
            userId,
            balance: 1 + Math.random() * 10000
        });
        const token = jsonwebtoken_1.default.sign({
            userId
        }, JWT_SECRET);
        res.json({
            message: "User created successfully!",
            token: token,
            balance: balance,
            user: {
                name: user.firstName,
            }
        });
    }
    catch (error) {
        res.status(411).json({
            message: "User already exists with this username"
        });
    }
}));
const signinBody = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string()
});
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = signinBody.safeParse(req.body);
    if (!parsed.success) {
        res.status(411).json({
            message: "email alredy taken or incorrect credentials!",
            error: parsed.error
        });
    }
    const user = yield db_1.UserModel.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            userId: user._id
        }, JWT_SECRET);
        res.json({
            token: token
        });
    }
    else {
        res.status(411).json({
            message: "Incorect credentials!"
        });
    }
}));
const updateBody = zod_1.z.object({
    password: zod_1.z.string().optional(),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional()
});
userRouter.put("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = updateBody.safeParse(req.body);
    if (!parsed.success) {
        res.status(411).json({
            message: "Error while updating!"
        });
    }
    try {
        const updatedUser = yield db_1.UserModel.updateOne({ _id: req.userId }, { $set: parsed.data });
        res.json({
            message: "Updated successfully!",
            updatedUser
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Something went wrong during update."
        });
    }
}));
userRouter.get("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || "";
    const users = yield db_1.UserModel.find({
        $or: [
            { username: { $regex: filter, $options: "i" } },
            { firstName: { $regex: filter, $options: "i" } },
            { lastName: { $regex: filter, $options: "i" } }
        ]
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
}));
exports.default = userRouter;
