import { IDBClient } from "../database/client";
import { Connection, EntityManager } from "typeorm";

export abstract class AbstractRepository {
  private dbClient: IDBClient;

  constructor(dbClient: IDBClient) {
    this.dbClient = dbClient;
  }

  getConnection(): Connection {
    return this.dbClient.getConnection();
  }

  getEntityManager(): EntityManager {
    return this.dbClient.getEntityManager();
  }
}
