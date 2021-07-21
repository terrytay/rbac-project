import Controller from "controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../services/user-service";
import { User } from "../entities/user-entity";
import logger from "../util/logger";
import { verifyToken } from "../middleware/auth";

class UserResponse implements GenericResponse {
  success: boolean;
  message: string;
  data: User;

  constructor(success: boolean, message: string, user: User) {
    this.success = success;
    this.message = message;
    this.data = user;
  }
}

export class UserController implements Controller {
  public path = "/user";
  public router = Router({ strict: true });

  private userService: IUserService;

  constructor(userService: IUserService) {
    this.initializeRoutes();

    this.userService = userService;
  }

  public initializeRoutes() {
    this.router.get(`${this.path}/:id`, verifyToken, this.get);
    this.router.post(`${this.path}`, this.post);
  }

  private get = async (request: Request, response: Response, next: NextFunction) => {
    let userResponse = new UserResponse(true, "OK", null);
    try {
      const id = request.params["id"];
      const user = await this.userService.getUser(id);
      userResponse.data = user;
      response.send(userResponse);
    } catch (e) {
      UserController.sendError(e, userResponse, response);
      return;
    }
  };

  private post = async (request: Request, response: Response, next: NextFunction) => {
    let userResponse = new UserResponse(true, "OK", null);

    try {
      let { username, password, email } = request.body;
      const createdUser = await this.userService.createUser({ username, password, email });
      userResponse.data = createdUser;
      response.send(userResponse);
    } catch (e) {
      UserController.sendError(e, userResponse, response);
      return;
    }
  };

  private static sendError(e: Error, message: UserResponse, response: Response) {
    logger.error("error getting user response: ", e);
    message.success = false;
    message.message = e.message;
    response.status(StatusCodes.BAD_REQUEST).send(message);
  }
}
