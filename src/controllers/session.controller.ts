import { Request, Response } from "express";
import User from "../models/user.model";
import { signJwt } from "../utils/jwt";
import {
  createSessionService,
  findSessions,
  updateSession,
} from "../services/session.service";
import configs from "../configs";
import log from "../utils/logger";
import { CreateSessionInput } from "../schemas/session.schema";
import { validatePassword } from "../services/user.service";

export async function createSession(
  req: Request<{}, {}, CreateSessionInput["body"]>,
  res: Response
) {
  try {
    //check if the password is valid
    const user = await validatePassword(req.body);

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    // if valid create a session, access token and refresh token and send them
    const session = await createSessionService(
      user._id,
      req.get("user-agent") || ""
    );

    console.log(
      "Token Objecvt : ",
      JSON.stringify({ ...user, session: session._id })
    );

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: configs.appConfigs.accessTokenTtl }
    );

    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: configs.appConfigs.refreshTokenTtl }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 900000,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    return res.json({ accessToken, refreshToken });
  } catch (e: any) {
    log.error(e.message);
    return res.json({ message: e.message });
  }
}

export async function getAllSessions(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    const sessions = await findSessions({ user: userId, valid: true });
    return res.json(sessions);
  } catch (e: any) {
    return res.json({ error: e.message });
  }
}

export async function deleteSession(req: Request, res: Response) {
  const sessionId = req.params.id;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
