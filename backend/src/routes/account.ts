import { Router } from "express";
import { AccountModel } from "../db";
import { authMiddleware } from "../middleware";

const accountRouter = Router();

accountRouter.get("/balance",authMiddleware ,async (req, res) => {
    const account = await AccountModel.findOne({
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        balance: account?.balance
    })
})



export default accountRouter