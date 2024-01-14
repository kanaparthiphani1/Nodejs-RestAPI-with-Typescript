import express from "express";
import userRouter from "./user.route";
import sessionRouter from "./session.route";
import productRouter from "./product.route";
const v1Router = express.Router();
v1Router.use(userRouter);
v1Router.use(sessionRouter);
v1Router.use(productRouter);
export default v1Router;
