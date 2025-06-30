import mongoose from "mongoose";
import { Schema } from "mongoose";

mongoose.connect("mongodb+srv://zisshhh:T5DjA6oZ87VdH72I@cluster0.4gkrk.mongodb.net/paytm");

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
