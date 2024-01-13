import express from "express";
import healthCheck from "../controllers/health-check.controller";
import v1Router from "./v1";

const router = express.Router();

router.get("/health-check", healthCheck);

router.use("/api/v1", v1Router);
export default router;
