import User, { UserInput } from "../models/user.model";
import { CreateUserInput } from "../schemas/user.schema";

async function createUser(input: UserInput) {
  try {
    const user = await User.create(input);
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
}

export default { createUser };
