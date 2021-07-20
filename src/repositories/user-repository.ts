import { IDBClient } from "../database/client";
import { User, UserDTO } from "../entities/user-entity";
import { AbstractRepository } from "./abstract-repository";

export interface IUserRepository {
  getUser(id: string): Promise<User>;
  createUser(user: User): Promise<User>;
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
}
