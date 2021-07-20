import Controller from "controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../util/logger";

class HealthResponse implements GenericResponse {
  success: boolean;
  message: string;
  timestamp: number;

  constructor(success: boolean, message: string, timestamp: number) {
    this.success = success;
    this.message = message;
    this.timestamp = timestamp;
  }
}

export class HealthController implements Controller {
  public path = "/health";
  public router = Router({ strict: true });

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.get);
  }

  private get = async (request: Request, response: Response, next: NextFunction) => {
    const healthResponse = new HealthResponse(true, "OK", Date.now());

    try {
      response.send(healthResponse);
    } catch (e) {
      HealthController.sendError(e, healthResponse, response);
    }
  };

  private static sendError(e: Error, message: HealthResponse, response: Response) {
    logger.error("error sending health check response: ", e);

    message.message = e.message;
    response.sendStatus(StatusCodes.SERVICE_UNAVAILABLE);
  }
}
