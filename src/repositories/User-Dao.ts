import { PoolClient } from "pg";
import { connectionPool } from ".";
import { User } from "../Models/User";
import { InternalServerError } from "../Errors/InternalServerError";
import { BadCredentialsError } from "../Errors/BadCredentialsError";
import { UserNotFoundError } from "../Errors/UserNotFoundError";
import { UserDTO } from "../DTOs/UserDTO";
import { userDTOToUserConverter } from "../Utils/user-dto-to-user-converter";

//Login
export async function daoFindUserByUsernameAndPassword(
  username: string,
  password: string
): Promise<User> {
  let client: PoolClient; // our potential connection to db
  try {
    client = await connectionPool.connect();

    // a paramaterized query

    let results = await client.query(
      `SELECT * FROM public.users U inner join public.roles R ON U."role" = R.role_id  
WHERE username = $1  and "password" = $2;`,
      [username, password]
    );

    if (results.rowCount !== 0) {
      return userDTOToUserConverter(results.rows[0]);
    } else {
      throw new UserNotFoundError();
    }
  } catch (e) {
    console.log(e);
    if (e.message === "User Not Found") {
      throw new BadCredentialsError();
    } else {
      throw new InternalServerError();
    }
  } finally {
    client && client.release();
  }
}

// this function gets anf formats all users
export async function daoFindAllUsers(): Promise<User[]> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    let results = await client.query(
      'SELECT * FROM public.users U inner join public.roles R on U."role" = R.role_id'
    );
    return results.rows.map(userDTOToUserConverter);
  } catch (e) {
    throw new InternalServerError();
  } finally {
    client && client.release();
  }
}

// function that saves a new user and returns that user with its new id
export async function daoSaveOneUser(newUser: UserDTO): Promise<User> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    let role_id = (
      await client.query("SELECT * FROM public.roles WHERE role_id = $1", [
        newUser.role
      ])
    ).rows[0].role_id;
    let result = await client.query(
      'INSERT INTO public.users (username, "password", firstName, lastName, email, ) values ($1,$2,$3,$4,$5,$6) RETURNING user_id;',
      [
        newUser.username,
        newUser.password,
        newUser.email,
        newUser.first_name,
        newUser.last_name,
        newUser.role
      ]
    );
    // put that newly genertaed user_id on the DTO
    newUser.user_id = result.rows[0].user_id;
    return userDTOToUserConverter(newUser); // convert and send back
  } catch (error) {
    throw new InternalServerError();
  } finally {
    client && client.release();
  }
}

//FIND USER BY ID
export async function daoFindUserById(user_id): Promise<User> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    let result = await client.query(
      `SELECT * FROM public.users inner join public.roles on public.users."role" = public.roles.role_id WHERE user_id = $1;`,
      [user_id]
    );
    if (result.rowCount !== 0) {
      return userDTOToUserConverter(result.rows[0]);
    } else {
      throw new UserNotFoundError();
    }
  } catch (e) {
    if (e.message === "User Not Found") {
      throw new UserNotFoundError();
    } else {
      console.log(e);
      throw new InternalServerError();
    }
  } finally {
    client && client.release();
  }
}

export async function daoUpdateUser(updatedUser: UserDTO): Promise<User> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    let user = await client.query(
      `SELECT * FROM public.users WHERE user_id = $1;`,
      [updatedUser.user_id]
    );

    updatedUser.username = updatedUser.username || user.rows[0].username;
    updatedUser.password = updatedUser.password || user.rows[0].password;
    updatedUser.first_name = updatedUser.first_name || user.rows[0].lastName;
    updatedUser.last_name = updatedUser.last_name || user.rows[0].lastName;
    updatedUser.email = updatedUser.email || user.rows[0].email;
    updatedUser.role = updatedUser.role || user.rows[0].role;

    await client.query(
      `UPDATE public.users SET username = $1, "password" = $2, first_name = $3, last_name = $4,
  email = $5, "role" = $6 WHERE user_id =$7;`,
      [
        updatedUser.username,
        updatedUser.password,
        updatedUser.first_name,
        updatedUser.last_name,
        updatedUser.email,
        updatedUser.role,
        updatedUser.user_id
      ]
    );

    let result = await client.query(
      `SELECT * FROM public.users inner join public.roles on public.users."role" = public.roles.role_id WHERE
    user_id = $1,;`,
      [updatedUser.user_id]
    );
    if (result.rowCount !== 0) {
      return userDTOToUserConverter(result.rows[0]);
    } else {
      throw new UserNotFoundError();
    }
  } catch (e) {
    console.log(e);
    throw new InternalServerError();
  } finally {
    client && client.release();
  }
}
