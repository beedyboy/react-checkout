"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const productRoute_1 = __importDefault(require("./route/productRoute"));
const connectDb_1 = require("./config/connectDb");
const error_1 = __importDefault(require("./middleware/error"));
dotenv_1.default.config({
    path: "server/config/config.env",
});
(0, connectDb_1.connectDb)();
// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err.stack}`);
    console.log("shutting down due to uncaughtException");
    process.exit(1);
});
// Handle promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down server due to unhandledRejection");
    server.close(() => {
        process.exit(1);
    });
});
const PORT = parseInt(process.env.PORT || "5000");
const ENV = process.env.NODE_ENV || "development";
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use("/api/v1/", productRoute_1.default);
// Error handling middleware
app.use(error_1.default);
const server = app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT} in ${ENV} mode`);
});
