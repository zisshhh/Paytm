"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL;
mongoose_1.default.connect(MONGO_URL);
const userSchema = new mongoose_2.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});
const accountSchema = new mongoose_2.Schema({
    userId: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
exports.UserModel = mongoose_1.default.model("user", userSchema);
exports.AccountModel = mongoose_1.default.model("account", accountSchema);
