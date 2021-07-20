import Controller from "controller.interface";
import App from "./app";

interface IRepositories {}

interface IServices {}

function getRepositories(): IRepositories {
  return {};
}

function getServices(repositories: IRepositories): IServices {
  return {};
}

function getControllers(services: IServices): Controller[] {
  return [];
}

// TODO: Pass in dbClient DI
// Wire up the variable dependencies and start the app
export function initApp(): void {
  const repositories = getRepositories();
  const services = getServices(repositories);
  const controllers = getControllers(services);

  const app = new App(controllers);

  const port = process.env.PORT || "3000";
  app.start(port);
}