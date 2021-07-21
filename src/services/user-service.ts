import { IUserInput, Role, User } from "../entities/user-entity";
import { IUserRepository } from "../repositories/user-repository";

import * as bc from "bcrypt";
import { nanoid } from "nanoid";
import { MissingParamsError } from "../error-handlers/base";

export interface IUserService {
  getUser(id: string): Promise<User>;
  createUser(userInput: IUserInput): Promise<User>;
}

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUser(id: string): Promise<User> {
    try {
      return await this.userRepository.getUser(id);
    } catch (e) {
      throw e;
    }
  }

  async createUser(userInput: IUserInput): Promise<User> {
    let createdUser: User;

    try {
      const { username, password, email } = userInput;
      if (!username || !password || !email) throw new MissingParamsError("username/password/email empty");

      const hashedPassword = await bc.hash(password, 10);

      const user = new User(username, hashedPassword, email, Role.USER, new Date(Date.now()), nanoid());
      createdUser = await this.userRepository.createUser(user);
    } catch (e) {
      throw e;
    }
    return createdUser;
  }
}
