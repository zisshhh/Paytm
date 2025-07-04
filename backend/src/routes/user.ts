import { Router } from "express";
import { Request, Response } from "express";
import { AccountModel, UserModel } from "../db";
import { z } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authMiddleware } from "../middleware";
dotenv.config();
const JWT_SECRET = process.env.JWT_PASSWORD as string

const userRouter = Router();

const signupBody = z.object({
    username: z.string().email(),
    password: z.string().min(5).max(10),
    firstName: z.string(),
    lastName: z.string()
})

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const parsed = signupBody.safeParse(req.body);

        if (!parsed.success) {
            res.status(411).json({
                message: "email already taken or incorrect credentials",
                error: parsed.error
            });
            return
        };

        const existingUser = await UserModel.findOne({
            username: req.body.username
        });

        if (existingUser) {
            res.status(411).json({
                message: "User alredy exist!"
            })
        };

        const user = await UserModel.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        const userId = user._id;

        const balance = await AccountModel.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({
            userId
        }, JWT_SECRET)

        res.json({
            message: "User created successfully!",
            token: token,
            balance: balance,
            user: {
                name: user.firstName,
            }
        });
    } catch (error) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
});

const signinBody = z.object({
    username: z.string().email(),
    password: z.string()
})

userRouter.post("/signin", async (req: Request, res: Response) => {
    const parsed = signinBody.safeParse(req.body);

    if (!parsed.success) {
        res.status(411).json({
            message: "email alredy taken or incorrect credentials!",
            error: parsed.error
        })
    }

    const user = await UserModel.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        res.json({
            token: token
        })
    } else {
        res.status(411).json({
            message: "Incorect credentials!"
        })
    }
})

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

userRouter.put("/", authMiddleware, async (req, res) => {
    const parsed = updateBody.safeParse(req.body);
    if (!parsed.success) {
        res.status(411).json({
            message: "Error while updating!"
        })
    }

    try {
        const updatedUser = await UserModel.updateOne(
            { _id: (req as any).userId },
            { $set: parsed.data }
        );

        res.json({
            message: "Updated successfully!",
            updatedUser
        });
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong during update."
        });
    }
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await UserModel.find({
        $or: [
            { username: { $regex: filter, $options: "i" } },
            { firstName: { $regex: filter, $options: "i"}},
            { lastName: { $regex: filter, $options: "i"}}
        ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


export default userRouter;