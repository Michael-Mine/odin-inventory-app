const pool = require("./pool");

async function getSystems() {
  const { rows } = await pool.query("SELECT * FROM systems");
  console.log(rows);
  return rows;
}

async function insertSystem(name) {
  await pool.query("INSERT INTO systems (name) VALUES ($1)", [name]);
  getSystems();
}

async function getGame(gameId) {
  const { rows } = await pool.query("SELECT * FROM games WHERE id = ($1)", [
    gameId,
  ]);
  return rows;
}

async function updateGame({ system, gameId }) {
  await pool.query("UPDATE games SET system = ($1) WHERE id = ($2)", [
    system,
    gameId,
  ]);
}

async function deleteGame(gameId) {
  await pool.query("UPDATE games SET retiredOn = ($1) WHERE id = ($2)", [
    new Date(),
    gameId,
  ]);
}

module.exports = {
  getSystems,
  insertSystem,
  getGame,
  updateGame,
  deleteGame,
};
