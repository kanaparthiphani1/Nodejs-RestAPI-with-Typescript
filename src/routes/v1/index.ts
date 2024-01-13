import express from "express";
import userRouter from "./user.route";
import sessionRouter from "./session.route";
const v1Router = express.Router();
v1Router.use(userRouter);
v1Router.use(sessionRouter);
export default v1Router;
