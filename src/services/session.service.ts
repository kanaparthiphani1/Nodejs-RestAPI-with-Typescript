import Session from "../models/session.model";
import { UserDocument } from "../models/user.model";

export async function createSessionService(userId: string, userAgent: string) {
  try {
    const session = await Session.create({ user: userId, userAgent });
    return session;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
