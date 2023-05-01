import  express, {Express} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "http";
import productRoute from "./route/productRoute";
import { connectDb } from "./config/connectDb";
import errorMiddleWare from "./middleware/error";
import { seedProducts } from "./utils/seeder";

dotenv.config({
  path: "server/config/config.env",
});

connectDb();
// seedProducts();


// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("shutting down due to uncaughtException");
  process.exit(1);
});

// Handle promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down server due to unhandledRejection");
  server.close(() => {
    process.exit(1);
  });
});

const PORT: number = parseInt(process.env.PORT || "5000");
const ENV: string = process.env.NODE_ENV || "development";

const app: Express = express();

const allowedOrigins: string[] = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1/", productRoute);

// Error handling middleware
app.use(errorMiddleWare);

const server: Server = app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} in ${ENV} mode`);
});
