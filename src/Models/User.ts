import { Role } from "../Models/Role";

export class User {
  user_id: number; // a unique number for identification
  username: string;
  // password: string;
  firstName: string;
  lastName: string;
  email: string; // their user permissions
  role: Role;
  // user - for you can use the service
  // admin - you can ban people or add/remove movies
  constructor(
    user_id: number,
    username: string,
    // password: string,
    firstName: string,
    lastName: string,
    email: string,
    role: Role
  ) {
    this.user_id = user_id;
    this.username = username;
    // this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
