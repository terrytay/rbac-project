import { NextFunction, Request, Response } from "express";
import { formatDate } from "../util/date";
import logger from "../util/logger";

/*
Logs accessed routes with response times and response codes
 */
export function loggingMiddleware(request: Request, response: Response, next: NextFunction) {
  const url = request.url;
  if (url == "/health") {
    next();
    return;
  }

  const method = request.method;
  const formattedDate = formatDate(new Date());

  // Log only when the request has finished being processed
  response.on("finish", function () {
    const status = response.statusCode;
    const requestDuration = getRequestDurationInMilliseconds(process.hrtime());
    const logMessage = `[${formattedDate}] ${method}:${url} ${status} ${requestDuration.toLocaleString()} ms`;

    logger.info(logMessage);
  });

  next();
}

function getRequestDurationInMilliseconds(startTime: any): number {
  const NS_PER_SEC = 1e9; // convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds

  const diff = process.hrtime(startTime);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}
