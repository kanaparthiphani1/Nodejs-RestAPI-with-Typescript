import log from "../utils/logger";
import appConfigs from "./app.configs";
import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(<string>appConfigs.dbUri);
    log.info("Db connected");
  } catch (err) {
    log.error("Db not connected");
    process.exit(1);
  }
}
export default { connect };
