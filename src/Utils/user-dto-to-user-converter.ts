import { User } from "../Models/User";
import { Role } from "../Models/Role";

export function userDTOToUserConverter(userDTOToUserConverter): User {
  return new User(
    userDTOToUserConverter.user_id,
    userDTOToUserConverter.username,
    // userDTOToUserConverter.password,
    userDTOToUserConverter.first_name,
    userDTOToUserConverter.last_name,
    userDTOToUserConverter.email,
    new Role(userDTOToUserConverter.role_id, userDTOToUserConverter.role)
  );
}
