export class UserDTO {
  user_id: number; //
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string; // their user permissions
  role_id: number;
  // user - for you can use the service
  // admin - you can ban people or add/remove movies
  constructor(
    user_id: number,
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    roleId: number
  ) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.first_name = firstName;
    this.last_name = lastName;
    this.role = role;
    this.role_id = roleId;
  }
}
