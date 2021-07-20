import { SanitizedUser } from "../entities/user-entity";
import { IUserRepository } from "../repositories/user-repository";

export interface IAuthService {
  login(username: string, password: string): Promise<SanitizedUser>;
}

export class AuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async login(username: string, password: string) {
    try {
      const user = await this.userRepository.loginUser(username, password);
      const sanitizedUser = new SanitizedUser(user);
      return sanitizedUser;
    } catch (e) {
      throw e;
    }
  }
}
