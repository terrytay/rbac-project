import Controller from "controller.interface";
import App from "./app";
import { HealthController } from "./controllers/health-controller";
import { UserController } from "./controllers/user-controller";
import { IDBClient } from "./database/client";
import { IUserRepository, UserRepository } from "./repositories/user-repository";
import { IUserService, UserService } from "./services/user-service";

interface IRepositories {
  userRepository: IUserRepository;
}

interface IServices {
  userService: IUserService;
}

function getRepositories(dbClient: IDBClient): IRepositories {
  return {
    userRepository: new UserRepository(dbClient),
  };
}

function getServices(repositories: IRepositories): IServices {
  return {
    userService: new UserService(repositories.userRepository),
  };
}

function getControllers(services: IServices): Controller[] {
  return [new HealthController(), new UserController(services.userService)];
}

// TODO: Pass in dbClient DI
// Wire up the variable dependencies and start the app
export function initApp(dbClient: IDBClient): void {
  const repositories = getRepositories(dbClient);
  const services = getServices(repositories);
  const controllers = getControllers(services);

  const app = new App(controllers);

  const port = process.env.PORT || "3000";
  app.start(port);
}
