import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import jwt from "jsonwebtoken";
import fs from "fs";

import { SanitizedUser } from "../entities/user-entity";
import { AuthResponse } from "../controllers/auth-controller";
import logger from "../util/logger";

const privateKey = fs.readFileSync("jwtRS256.key");

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
  let accessToken: string;

  try {
    const authorizationHeader = request.header("Authorization");
    accessToken = authorizationHeader.split(" ")[1];
  } catch (e) {
    sendError(new Error("missing bearer token"), response, StatusCodes.EXPECTATION_FAILED);
    return;
  }

  jwt.verify(
    accessToken,
    privateKey,
    { algorithms: ["RS256"] },
    function (err: Error, decoded: { user: SanitizedUser }) {
      if (err) {
        sendError(err, response, StatusCodes.UNAUTHORIZED);
        return;
      }

      next();
    }
  );
};

function sendError(e: Error, response: Response, statusCode: StatusCodes) {
  const authResponse = new AuthResponse(false, null);
  authResponse.success = false;
  authResponse.message = e.message;
  response.status(statusCode).send(authResponse);
}
