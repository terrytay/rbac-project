import * as jwt from "jsonwebtoken";
import fs from "fs";
import { SanitizedUser } from "../entities/user-entity";

const privateKey = fs.readFileSync("jwtRS256.key");

export const generateToken = async (payload: { user: SanitizedUser }) => {
  return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: 30 });
};
