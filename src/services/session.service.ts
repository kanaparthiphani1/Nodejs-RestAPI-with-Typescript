import { FilterQuery } from "mongoose";
import Session, { sessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import log from "../utils/logger";
import { signJwt, verifyJwt } from "../utils/jwt";
import { get } from "lodash";
import configs from "../configs";
import { findUser } from "./user.service";

export async function createSessionService(userId: string, userAgent: string) {
  try {
    const session = await Session.create({ user: userId, userAgent });
    return session;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function findSessions(query: FilterQuery<sessionDocument>) {
  try {
    log.debug("Query : ", query);
    const sessions = await Session.find(query);
    return sessions;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded || !get(decoded, "session")) return false;
  const session = await Session.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: configs.appConfigs.accessTokenTtl }
  );

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<sessionDocument>,
  updateQuery: FilterQuery<sessionDocument>
) {
  try {
    log.debug("Query : ", query);
    const session = await Session.updateOne(query, updateQuery);
    return session;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
