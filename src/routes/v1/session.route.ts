import express from "express";
import {
  createSession,
  getAllSessions,
} from "../../controllers/session.controller";
import { checkResource } from "../../middlewares/checkResource";
import { createSessionSchema } from "../../schemas/session.schema";
import { requireUser } from "../../middlewares/requireUser";

const sessionRouter = express.Router();

sessionRouter.post(
  "/sessions",
  checkResource(createSessionSchema),
  createSession
);
sessionRouter.get("/sessions", requireUser, getAllSessions);

export default sessionRouter;
