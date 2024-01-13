import express from "express";
import { createUser } from "../../controllers/user.controller";
import { checkResource } from "../../middlewares/checkResource";
import { createUserSchema } from "../../schemas/user.schema";

const userRouter = express.Router();

userRouter.post("/users", checkResource(createUserSchema), createUser);

export default userRouter;
