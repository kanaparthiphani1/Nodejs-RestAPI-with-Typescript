import express from "express";
import { createSession } from "../../controllers/session.controller";
import { checkResource } from "../../middlewares/checkResource";
import { createSessionSchema } from "../../schemas/session.schema";

const sessionRouter = express.Router();

sessionRouter.post(
  "/sessions",
  checkResource(createSessionSchema),
  createSession
);

export default sessionRouter;
