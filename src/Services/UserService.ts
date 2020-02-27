import {
  daoFindUserByUsernameAndPassword,
  daoFindAllUsers,
  daoSaveOneUser,
  daoFindUserById,
  daoUpdateUser
} from "../repositories/user-dao";

import { User } from "../Models/User";
import { UserDTO } from "../dtos/UserDTO";
import { userDTOToUserConverter } from "../Utils/user-dto-to-user-converter";

//returns user object if credentials pass
export async function findUserByUsernameAndPassword(
  username: string,
  password: string
): Promise<User> {
  return await daoFindUserByUsernameAndPassword(username, password);
}

//returns all users
export async function findAllUsers(): Promise<User[]> {
  return await daoFindAllUsers();
}

export async function saveOneUser(newUser: UserDTO): Promise<User> {
  return await daoSaveOneUser(newUser);
}
//finds users by their id
export async function findUserById(user_id: number): Promise<User> {
  return await daoFindUserById(user_id);
}
//updates the fields of a given user
export async function updateUser(users: UserDTO): Promise<User> {
  return await daoUpdateUser(users);
}
