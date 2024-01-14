import { NextFunction, Request, Response } from "express";

export function requireUser(req: Request, res: Response, next: NextFunction) {
  console.log("Came here requireUser");

  const user = res.locals.user;
  console.log("User : ", user._id);
  if (!user) {
    return res.status(401).json({
      message: "Need Valid AccessToken",
    });
  }

  return next();
}
