import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import jwt from "jsonwebtoken";
import fs from "fs";

import { SanitizedUser } from "../entities/user-entity";

const privateKey = fs.readFileSync("jwtRS256.key");

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
  let accessToken: string;

  try {
    const authorizationHeader = request.header("Authorization");
    accessToken = authorizationHeader.split(" ")[1];
  } catch (e) {
    response.sendStatus(StatusCodes.EXPECTATION_FAILED);
    return;
  }

  jwt.verify(
    accessToken,
    privateKey,
    { algorithms: ["RS256"] },
    function (err: Error, decoded: { user: SanitizedUser }) {
      if (err) {
        response.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
      }

      console.log(decoded.user);
      next();
    }
  );
};
