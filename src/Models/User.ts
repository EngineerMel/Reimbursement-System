export class User {
  user_id: number; // a unique number for identification
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string; // their user permissions
  // user - for you can use the service
  // admin - you can ban people or add/remove movies
  constructor(
    user_id: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string
  ) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
