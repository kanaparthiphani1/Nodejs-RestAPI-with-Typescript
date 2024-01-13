import jwt from "jsonwebtoken";
import configs from "../configs";

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, <string>configs.appConfigs.privateKey, {
    ...options,
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, <string>configs.appConfigs.publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
