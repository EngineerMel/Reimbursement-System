import { PoolClient } from "pg";
import { connectionPool } from ".";
import { User } from "../Models/User";
import { InternalServerError } from "../Errors/InternalServerError";
import { BadCredentialsError } from "../Errors/BadCredentialsError";
import { UserNotFoundError } from "../Errors/UserNotFoundError";
import { UserDTO } from "../DTOs/UserDTO";
import { userDTOToUserConverter } from "../Utils/user-dto-to-user-converter";

export async function daoFindUserByUsernameAndPassword(
  username: string,
  password: string
): Promise<User> {
  let client: PoolClient; // our potential connection to db
  try {
    client = await connectionPool.connect();

    // a paramaterized query
    let results = await client.query(
      'SELECT * FROM public.users U inner join public.roles R on U."role_id" = R.role_id  WHERE username = $1  and "password" = $2',
      [username, password]
    );

    if (results.rowCount === 0) {
      throw new Error("User Not Found");
    }
    return userDTOToUserConverter(results.rows[0]);
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
    let roleId = (
      await client.query("SELECT * FROM public.roles WHERE role_name = $1", [
        newUser.role_name
      ])
    ).rows[0].role_id;
    // send an insert that uses the id above and the user input
    let result = await client.query(
      'INSERT INTO public.users (username, "password", email, first_name, last_name, "role") values ($1,$2,$3,$4,$5,$6) RETURNING user_id;',
      [
        newUser.username,
        newUser.password,
        newUser.email,
        newUser.first_name,
        newUser.last_name,
        roleId
      ]
    );
    // put that newly genertaed user_id on the DTO
    newUser.user_id = result.rows[0].user_id;
    return userDTOToUserConverter(newUser); // convert and send back
  } catch (e) {
    throw new InternalServerError();
  } finally {
    client && client.release();
  }
}

export async function daoFindUserById(id: number): Promise<User> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    let result = await client.query(
      'SELECT * FROM public.users U inner join public.roles R on U."role" = R.role_id WHERE U.user_id = $1',
      [id]
    );
    if (result.rowCount === 0) {
      throw new Error("User Not Found");
    }
    return userDTOToUserConverter(result.rows[0]);
  } catch (e) {
    if (e.message === "User Not Found") {
      throw new UserNotFoundError();
    }
    throw new InternalServerError();
  } finally {
    client && client.release();
  }
}
