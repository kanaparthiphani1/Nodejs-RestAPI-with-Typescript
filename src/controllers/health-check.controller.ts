import { Request, Response } from "express";

function healthCheck(req: Request, res: Response) {
  res.status(200).json({
    message: "Server is running",
  });
}

export default healthCheck;
