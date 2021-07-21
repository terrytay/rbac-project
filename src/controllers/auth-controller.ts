import Controller from "controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../services/user-service";
import { SanitizedUser, User } from "../entities/user-entity";
import logger from "../util/logger";
import { IAuthService } from "../services/auth-service";
import { generateToken } from "../util/jwt";

class AuthResponse implements GenericResponse {
  success: boolean;
  message: string;
  data: { user: SanitizedUser; accessToken: string };

  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
    this.data = { user: null, accessToken: null };
  }
}

export class AuthController implements Controller {
  public path = "/auth";
  public router = Router({ strict: true });

  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.initializeRoutes();

    this.authService = authService;
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/login`, this.post);
  }

  private post = async (request: Request, response: Response, next: NextFunction) => {
    let authResponse = new AuthResponse(true, "OK");

    try {
      let { username, password } = request.body;
      const user = await this.authService.login(username, password);
      authResponse.data.user = user;

      const token = await generateToken({ user });
      authResponse.data.accessToken = token;

      response.send(authResponse);
    } catch (e) {
      AuthController.sendError(e, authResponse, response);
      return;
    }
  };

  private static sendError(e: Error, message: AuthResponse, response: Response) {
    logger.error("error getting auth response: ", e);
    message.success = false;
    message.message = e.message;
    response.status(StatusCodes.BAD_REQUEST).send(message);
  }
}
