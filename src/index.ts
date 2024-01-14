import configs from "./configs";
import express from "express";
import logger from "./utils/logger";
import cookieParser from "cookie-parser";
import router from "./routes";
import { deserializeUser } from "./middlewares/deserializeUser";

const { appConfigs, dbConfigs } = configs;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(deserializeUser);
app.use(router);

app.listen(appConfigs.port, async () => {
  logger.info(`Server Started`);
  dbConfigs.connect();
});
