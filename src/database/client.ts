import logger from "../util/logger";
import { Connection, createConnection, EntityManager } from "typeorm";
import { DBConfig } from "./config";

export interface IDBClient {
  initialize(): Promise<void>;
  getConnection(): Connection;
  getEntityManager(): EntityManager;
}

export class DBClient implements IDBClient {
  private connection: Connection;
  private connectionConfig: any;

  constructor(config: DBConfig) {
    this.connectionConfig = {
      type: config.dbType,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [
        //__dirname + "/entity/*.js"
        config.entities,
      ],
      synchronize: process.env.NODE_ENV === "production" ? false : true,
    };
    logger.info(`DB Synchronize set to: ${this.connectionConfig.synchronize}`);
  }

  public async initialize(): Promise<void> {
    // Check for empty config
    if (this.connectionConfig == null) {
      return Promise.reject(new Error("no config defined for database connection"));
    }

    // Create a connection
    await createConnection(this.connectionConfig)
      .then((connection) => {
        this.connection = connection;
        this.connectionConfig = null;
      })
      .catch((e) => {
        this.connectionConfig = null;

        // propagate the error upstream
        return Promise.reject(e);
      });
  }

  public getConnection(): Connection {
    return this.connection;
  }

  public getEntityManager(): EntityManager {
    return this.getConnection().manager;
  }
}
