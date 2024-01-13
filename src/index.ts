import configs from "./configs";
import express from "express";
import logger from "./utils/logger";
import router from "./routes";

const { appConfigs, dbConfigs } = configs;
const app = express();

app.use(express.json());

app.use(router);

app.listen(appConfigs.port, async () => {
  logger.info("Server Started Successfully");
  dbConfigs.connect();
});
