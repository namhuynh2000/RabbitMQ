import knex from "knex";

export default knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    post: 3306,
    user: "root",
    password: "root",
    database: "sakila",
  },
  pool: {
    min: 0,
    max: 10,
  },
});
