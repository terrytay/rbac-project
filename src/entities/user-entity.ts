import { Column, Entity, PrimaryColumn } from "typeorm";

export enum Role {
  USER = "user",
  ADMIN = "admin",
  ROOT = "root",
}

export interface IUserInput {
  username: string;
  password: string;
  email: string;
}

export class User {
  id: string;
  username: string;
  hashedPassword: string;
  email: string;
  role: Role;
  createdAt: Date;

  constructor(username: string, hashedPassword: string, email: string, role: Role, createdAt: Date, id: string) {
    this.id = id;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }

  public toDTO(): UserDTO {
    return new UserDTO(this.id, this.createdAt, this.username, this.email, this.hashedPassword, this.role);
  }
}
@Entity("users")
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
    return new User(this.username, this.hashedPassword, this.email, this.role, this.createdAt, this.id);
  }
}
