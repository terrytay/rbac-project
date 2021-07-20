import { IDBClient } from "../database/client";
import { SanitizedUser, User, UserDTO } from "../entities/user-entity";
import { AbstractRepository } from "./abstract-repository";

import * as bc from "bcrypt";

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
      throw new Error("server error");
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
      throw new Error("server error");
    }

    return createdUserDTO.toEntity();
  }

  async loginUser(username: string, password: string): Promise<User> {
    let userDTO: UserDTO;

    try {
      userDTO = await this.getEntityManager().findOne(UserDTO, { username });
      if (!userDTO) throw new Error("invalid username");

      const isValidPassword = await bc.compare(password, userDTO.hashedPassword);
      if (isValidPassword) {
        return userDTO.toEntity();
      }
      throw new Error("invalid password");
    } catch (e) {
      throw e;
    }
  }
}
