import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  dbUri: process.env.DATABASE_URL,
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  publicKey: process.env.PUBLIC_KEY?.replace(/\\n/g, "\n"),
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
};
