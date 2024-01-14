import { CreateUserInput } from "./../schemas/user.schema";
import { Request, Response } from "express";
import services from "../services";
import log from "../utils/logger";
import { omit } from "lodash";
export async function createUser(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await services.createUser(req.body);
    return res.status(200).json(omit(user.toJSON(), "password"));
  } catch (e: any) {
    log.error(`Request not satisfied : ${e.message}`);
    res.status(409).json({ message: e.message });
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  return res.send(res.locals.user);
}
