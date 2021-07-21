import { IDBClient } from "../database/client";
import { SanitizedUser, User, UserDTO } from "../entities/user-entity";
import { AbstractRepository } from "./abstract-repository";

import * as bc from "bcrypt";

import { RecordNotFoundError } from "../error-handlers/base";
import { UnableToCreateError } from "../error-handlers/base";
import { PasswordMismatchError } from "../error-handlers/base";

import { getProcessedError } from "./util";

export interface IUserRepository {
  getUser(id: string): Promise<User>;
  createUser(user: User): Promise<User>;

  loginUser(username: string, password: string): Promise<User>;
}

export class UserRepository extends AbstractRepository implements IUserRepository {
  constructor(dbClient: IDBClient) {
    super(dbClient);
  }

  async getUser(id: string): Promise<User> {
    let user: User;

    try {
      const userDTO = await this.getEntityManager().findOne(UserDTO, { id: id });
      user = userDTO.toEntity();
    } catch (e) {
      throw new RecordNotFoundError("user not found in db", e);
    }

    return user;
  }

  async createUser(user: User): Promise<User> {
    let userDTO: UserDTO;
    let createdUserDTO: UserDTO;
    try {
      userDTO = user.toDTO();
      createdUserDTO = await this.getEntityManager().save(UserDTO, userDTO);
    } catch (e) {
      throw new UnableToCreateError("user not created", e);
    }

    return createdUserDTO.toEntity();
  }

  async loginUser(username: string, password: string): Promise<User> {
    let userDTO: UserDTO;

    try {
      userDTO = await this.getEntityManager().findOne(UserDTO, { username });
      if (!userDTO) throw new RecordNotFoundError("username invalid");

      const isValidPassword = await bc.compare(password, userDTO.hashedPassword);
      if (isValidPassword) {
        return userDTO.toEntity();
      }
      throw new PasswordMismatchError("password invalid");
    } catch (e) {
      throw getProcessedError(e);
    }
  }
}
