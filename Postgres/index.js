const { Pool } = require("pg");

const user = "postgres";
const host = "localhost";
const database = "test";
const password = "322223";
const port = "5432";

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});

async function queryDB() {
  const res = await pool.query("SELECT name FROM dogs");
  console.log(res.rows);

  for (const row of res.rows) {
    console.log(row.name);
  }

  const name = "Roger";
  const age = 8;
  try {
    await pool.query("INSERT INTO dogs VALUES $1, $2", [name, age]);
  } catch (err) {
    console.error(err);
  }
}

queryDB();
