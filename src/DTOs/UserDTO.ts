import { Role } from "../Models/Role";

export class UserDTO {
  user_id: number; //
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role; // their user permissions
  // user - for you can use the service
  // admin - you can ban people or add/remove movies
  constructor(
    user_id: number,
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    role: Role
  ) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
