import { nanoid } from "nanoid";
import { Column, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum Role {
  USER = "user",
  ADMIN = "admin",
  ROOT = "root",
}

export interface IUserInput {
  id?: string;
  username: string;
  hashedPassword: string;
  email: string;
  role: Role;
  createdAt?: Date;
}

export class User {
  id: string;
  username: string;
  hashedPassword: string;
  email: string;
  role: Role;
  createdAt: Date;

  constructor(userInput: IUserInput) {
    this.id = userInput.id;
    this.username = userInput.username;
    this.hashedPassword = userInput.hashedPassword;
    this.email = userInput.email;
    this.role = userInput.role;
    this.createdAt = userInput.createdAt;

    if (!userInput.id || userInput.id === null) {
      this.id = nanoid();
    }

    if (!userInput.createdAt || userInput.createdAt === null) {
      this.createdAt = new Date(Date.now());
    }
  }

  public toDTO() {
    return new UserDTO(this.id, this.createdAt, this.username, this.email, this.hashedPassword, this.role);
  }
}

export class UserDTO {
  @PrimaryColumn()
  id: string;

  @Column("timestamp")
  createdAt: Date;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Column()
  role: Role;

  constructor(id: string, createdAt: Date, username: string, email: string, hashedPassword: string, role: Role) {
    this.id = id;
    this.createdAt = createdAt;
    this.username = username;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
  }

  public toEntity(): User {
    return new User({
      id: this.id,
      createdAt: this.createdAt,
      username: this.username,
      email: this.username,
      hashedPassword: this.hashedPassword,
      role: this.role,
    });
  }
}
