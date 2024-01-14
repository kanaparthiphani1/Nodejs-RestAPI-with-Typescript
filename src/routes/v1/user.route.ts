import express from "express";
import { createUser, getCurrentUser } from "../../controllers/user.controller";
import { checkResource } from "../../middlewares/checkResource";
import { createUserSchema } from "../../schemas/user.schema";
import { requireUser } from "../../middlewares/requireUser";

const userRouter = express.Router();

userRouter.post("/users", checkResource(createUserSchema), createUser);
userRouter.get("/user/current", requireUser, getCurrentUser);

export default userRouter;
