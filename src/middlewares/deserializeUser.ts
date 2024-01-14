import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import log from "../utils/logger";
import { reIssueAccessToken } from "../services/session.service";

export async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("Came here");

    log.info("deserializing user");
    const accessToken = get(req, "headers.authorization")?.replace(
      /^Bearer\s/,
      ""
    );
    const refreshToken = get(req, "headers.x-refresh");
    if (!accessToken) {
      return next();
    }

    const { decoded, expired, valid } = verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    if (expired && refreshToken) {
      const accessToken = await reIssueAccessToken({
        refreshToken: <string>refreshToken,
      });

      if (accessToken) {
        res.setHeader("x-access-token", <string>accessToken);
      }

      console.log("new AccessToken  :", accessToken);

      const result = verifyJwt(accessToken as string);
      console.log("new res  :", result);

      res.locals.user = result.decoded;
      return next();
    }

    return next();
  } catch (e: any) {
    log.error(e.message);
    return res.json({ error: e.message });
  }
}
