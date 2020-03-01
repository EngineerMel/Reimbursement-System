import { User } from "../Models/User";
import { Role } from "../Models/Role";

export function userDTOToUserConverter(userDTOToUserConverter): User {
  return new User(
    userDTOToUserConverter.user_id,
    userDTOToUserConverter.username,
    // userDTOToUserConverter.password,
    userDTOToUserConverter.firstName,
    userDTOToUserConverter.lastName,
    userDTOToUserConverter.email,
    new Role(userDTOToUserConverter.role_id, userDTOToUserConverter.role)
  );
}
