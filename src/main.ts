import { config } from "dotenv";
import path from "path";
import { exit } from "shelljs";
import { initApp } from "./server";
import logger from "./util/logger";

// Load config from environment variables
loadConfig();

// TODO: Initialize database connection
try {
  // Database initialization goes here

  // TODO: Move this into block where db init is successful
  initApp();
} catch (e) {
  logger.error("failed to connect to db: ", e);
  exit(1);
}

/**
 * @description Load enivronment variables config file based on which environment is set in NODE_ENV. Shuts down if error occurs.
 */
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
