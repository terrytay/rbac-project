import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bp from "body-parser";
import Controller from "controller.interface";
import logger from "./util/logger";
import { loggingMiddleware } from "./middleware/logging";
import errorHandler from "errorhandler";

export default class App {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.app.get("/", (request: Request, response: Response, next: NextFunction) => {
      return response.sendStatus(StatusCodes.OK);
    });

    // Initialize global middlewares
    this.initializeMiddlewares();

    // Initialize controllers
    this.initializeControllers(controllers);
  }

  public start(port: string) {
    this.app.listen(port, () => {
      logger.info(`Process ENV: ${process.env.NODE_ENV}`);
      logger.info(`App listening on the port: ${port}`);
    });
  }

  // Initialization of global middlware goes here
  public initializeMiddlewares() {
    this.app.use(bp.json({ strict: true }));

    // custom middleware to log accessed routes with response times and response codes
    this.app.use(loggingMiddleware);

    if (process.env.NODE_ENV !== "production") {
      this.app.use(errorHandler());
    }
  }

  private initializeControllers(controllers: Controller[]) {
    if (controllers == null) return;

    controllers.forEach((controller) => this.app.use("/", controller.router));
  }
}
