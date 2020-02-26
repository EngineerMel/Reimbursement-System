import { UserDTO } from "../DTOs/UserDTO";
import { User } from "../models/User";

export function userDTOToUserConverter(userDTO: UserDTO): User {
  return new User(
    userDTO.user_id,
    userDTO.username,
    userDTO.email,
    userDTO.first_name,
    userDTO.last_name,
    userDTO.role
  );
}
