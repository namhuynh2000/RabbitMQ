import knex from 'knex';

export default knex({
  client: 'pg',
  version: '14.2',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'kiki123',
    database: 'sakila-data'
  },
  pool: { min: 0, max: 10 }
});