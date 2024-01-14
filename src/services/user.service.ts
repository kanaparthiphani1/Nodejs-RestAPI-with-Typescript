import { omit } from "lodash";
import User, { UserDocument, UserInput } from "../models/user.model";
import { CreateUserInput } from "../schemas/user.schema";
import { FilterQuery } from "mongoose";

async function createUser(input: UserInput) {
  try {
    const user = await User.create(input);
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}
export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

export default { createUser };
