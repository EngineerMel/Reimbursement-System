import { Role } from "../Models/Role";

export class UserDTO {
  user_id: number; //
  username: string;
  password: string;
  first_name: string;
  last_name: string;
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
    this.first_name = firstName;
    this.last_name = lastName;
    this.role = role;
  }
}
