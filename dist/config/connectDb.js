"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "server/config/config.env",
});
const URI = process.env.MONGO ?? "";
mongoose_1.default.set('strictQuery', false);
const connectDb = () => {
    try {
        mongoose_1.default.connect(URI);
        console.log("connection to database is sucessful!");
    }
    catch (err) {
        console.log("Data base connection failed");
    }
    return {};
};
exports.connectDb = connectDb;
