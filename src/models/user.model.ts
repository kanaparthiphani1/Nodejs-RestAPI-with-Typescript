import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPass: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  return next();
});

userSchema.methods.comparePassword = async function (
  userPass: string
): Promise<boolean> {
  let user = this as UserDocument;
  try {
    const res = await bcrypt.compare(userPass, user.password);
    return res;
  } catch (e) {
    return false;
  }
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
