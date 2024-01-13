import express from "express";
import healthCheck from "../controllers/health-check.controller";

const router = express.Router();

router.get("/health-check", healthCheck);

export default router;
