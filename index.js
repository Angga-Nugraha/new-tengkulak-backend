import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./data/database.js";
import userRouter from "./routes/user_route.js";
import authRouter from "./routes/auth_route.js";
import uploadRouter from "./routes/upload_route.js";
import productRouter from "./routes/product_route.js";
import cartRouter from './routes/cart_route.js';
import { dbError, errorMessage } from "./midleware/errorHandler.js";

dotenv.config(".env");
const app = express();

connectDb()
  .then(() => console.info(`Connected to database`)
  ).catch((err) => {
    console.error(`Connection error: ${err.stack}`);
    process.exit(1);
  });



app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    credentials: true,
    origin: `http://localhost:${process.env.PORT}`,
  })
);

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());

app.use(userRouter);
app.use(authRouter);
app.use(uploadRouter);
app.use(productRouter);
app.use(cartRouter);

app.use(dbError);
app.use(errorMessage);

app.listen(process.env.PORT, () => {
  console.log(`Aplication running on http://localhost:${process.env.PORT}`);
});
