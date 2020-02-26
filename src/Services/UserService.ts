import {
  daoFindUserByUsernameAndPassword,
  daoFindAllUsers,
  daoSaveOneUser,
  daoFindUserById
} from "../repositories/user-dao";
import { User } from "../models/User";
import { UserDTO } from "../dtos/UserDTO";

export async function findUserByUsernameAndPassword(
  username: string,
  password: string
): Promise<User> {
  return await daoFindUserByUsernameAndPassword(username, password);
}

export async function findAllUsers(): Promise<User[]> {
  return await daoFindAllUsers();
}

export async function saveOneUser(newUser: UserDTO): Promise<User> {
  return await daoSaveOneUser(newUser);
}

export async function findUserById(id: number): Promise<User> {
  return await daoFindUserById(id);
}
