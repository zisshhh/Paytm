import mongoose from "mongoose";
import { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URL = process.env.MONGO_URL as string

mongoose.connect(MONGO_URL);

const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

export const UserModel = mongoose.model("user", userSchema);
export const AccountModel = mongoose.model("account", accountSchema);
