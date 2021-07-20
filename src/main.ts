import { config } from "dotenv";
import path from "path";
import { exit } from "shelljs";
import logger from "./util/logger";

// Load config from environment variables
loadConfig();

function loadConfig() {
  const NODE_ENV = process.env.NODE_ENV || "dev";
  const envFilePath = __dirname + path.sep + "config" + path.sep + ".env." + NODE_ENV;

  // Load config based on env
  const loadConfigResult = config({ path: envFilePath });

  // If config loading failed, shut the process down
  if (loadConfigResult != null && loadConfigResult.error != null) {
    logger.error(loadConfigResult.error);
    exit(1);
  }
}
