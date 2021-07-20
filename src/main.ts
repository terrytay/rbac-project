import { config } from "dotenv";
import path from "path";
import { exit } from "shelljs";
import { DBClient } from "./database/client";
import { DBConfig, DBType } from "./database/config";
import { initApp } from "./server";
import logger from "./util/logger";

// Load config from environment variables
loadConfig();

try {
  // Database initialization
  const dbClient = new DBClient(
    new DBConfig(
      DBType.POSTGRES,
      process.env.DB_HOST,
      process.env.DB_DATABASE,
      +process.env.DB_PORT,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      __dirname + "/entities/*.{js,ts}"
    )
  );

  dbClient
    .initialize()
    .then(() => {
      logger.info("connection to db established successfully");

      // Initialize app here with dbClient passed in
      initApp(dbClient);
    })
    .catch((e) => {
      throw new Error("unable to establish db connection: " + e);
    });
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
