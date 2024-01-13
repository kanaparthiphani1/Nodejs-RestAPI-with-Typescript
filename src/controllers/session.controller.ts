import { Request, Response } from "express";
import User from "../models/user.model";
import { signJwt } from "../utils/jwt";
import { createSessionService } from "../services/session.service";
import configs from "../configs";
import log from "../utils/logger";
import { CreateSessionInput } from "../schemas/session.schema";

export async function createSession(
  req: Request<{}, {}, CreateSessionInput["body"]>,
  res: Response
) {
  try {
    //check if the password is valid
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "User not registered",
      });
    }

    // if not return 400
    const result = await user.comparePassword(password);
    if (!result) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    // if valid create a session, access token and refresh token and send them
    const session = await createSessionService(
      user._id,
      req.get("user-agent") || ""
    );
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: configs.appConfigs.accessTokenTtl }
    );

    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: configs.appConfigs.refreshTokenTtl }
    );

    return res.json({ accessToken, refreshToken });
  } catch (e: any) {
    log.error(e.message);
    return res.json({ message: e.message });
  }
}
