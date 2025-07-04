import { Router } from "express";
import { AccountModel } from "../db";
import { authMiddleware } from "../middleware";
import mongoose from "mongoose";

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const account = await AccountModel.findOne({
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        balance: account?.balance
    })
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body

    const account = await AccountModel.findOne({
        userId: (req as any).userId
    }).session(session);

    if(!account || account.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance or account not found!"
        })
    }

    const toAccountTranfer = await AccountModel.findOne({userId: to})

    if(!toAccountTranfer){
        await session.abortTransaction();
        res.status(400).json({
            message: "Account not found!"
        })
    }

    await AccountModel.updateOne({userId: (req as any).userId}, {$inc: {balance: -amount}}).session(session);
    await AccountModel.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transfered successfuly!"
    })
})

export default accountRouter