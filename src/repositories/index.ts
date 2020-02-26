import { Pool } from "pg";

const dotenv = require("dotenv");
dotenv.config();

export const connectionPool: Pool = new Pool({
  host: process.env.PROJECT0_HOST,
  user: process.env.PROJECT0_USER,
  password: process.env.PROJECT0_PASSWORD,
  database: process.env.PROJECT0_DATABASE,
  port: 5432,
  max: 5
});
