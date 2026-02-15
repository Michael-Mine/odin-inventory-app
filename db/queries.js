const pool = require("./pool");

async function getSystems() {
  const { rows } = await pool.query("SELECT * FROM systems");
  console.log(rows);
  return rows;
}

async function insertSystem({ name }) {
  await pool.query("INSERT INTO systems (name) VALUES ($1)", [name]);
  getSystems();
}

module.exports = {
  getSystems,
  insertSystem,
};
