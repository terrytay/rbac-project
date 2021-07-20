import Controller from "controller.interface";
import App from "./app";
import { AuthController } from "./controllers/auth-controller";
import { HealthController } from "./controllers/health-controller";
import { UserController } from "./controllers/user-controller";
import { IDBClient } from "./database/client";
import { IUserRepository, UserRepository } from "./repositories/user-repository";
import { AuthService, IAuthService } from "./services/auth-service";
import { IUserService, UserService } from "./services/user-service";

interface IRepositories {
  userRepository: IUserRepository;
}

interface IServices {
  userService: IUserService;
  authService: IAuthService;
}

function getRepositories(dbClient: IDBClient): IRepositories {
  return {
    userRepository: new UserRepository(dbClient),
  };
}

function getServices(repositories: IRepositories): IServices {
  return {
    userService: new UserService(repositories.userRepository),
    authService: new AuthService(repositories.userRepository),
  };
}

function getControllers(services: IServices): Controller[] {
  return [new HealthController(), new UserController(services.userService), new AuthController(services.authService)];
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
