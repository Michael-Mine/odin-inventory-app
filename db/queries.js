const pool = require("./pool");

async function getAllSystems() {
  const { rows } = await pool.query(
    "SELECT * FROM systems WHERE retiredOn = 'No'",
  );
  console.log(rows);
  return rows;
}

//can still access if retired, to view games on retired system
async function getSystem(systemId) {
  const { rows } = await pool.query("SELECT * FROM systems WHERE id = ($1)", [
    systemId,
  ]);
  return rows;
}

async function getAllSystemGames(systemId) {
  await pool.query(
    "SELECT * FROM games WHERE system = ($1) AND retiredOn = 'No'",
    [systemId],
  );
}

// still access but show as retired?
async function getGame(gameId) {
  const { rows } = await pool.query("SELECT * FROM games WHERE id = ($1)", [
    gameId,
  ]);
  return rows;
}

async function insertSystem(name) {
  await pool.query("INSERT INTO systems (name) VALUES ($1)", [name]);
}

// edit for new developer
async function insertGame({ title, year, developer }) {
  await pool.query(
    "INSERT INTO games (title, name, developer) VALUES ($1, $2, $3)",
    [title, year, developer],
  );
}

async function updateSystem({ gamepad, systemId }) {
  await pool.query("UPDATE system SET gamepad = ($1) WHERE id = ($2)", [
    gamepad,
    systemId,
  ]);
}

async function updateGame({ system, gameId }) {
  await pool.query("UPDATE games SET system = ($1) WHERE id = ($2)", [
    system,
    gameId,
  ]);
}

async function deleteSystem(systemId) {
  await pool.query("UPDATE system SET retiredOn = ($1) WHERE id = ($2)", [
    new Date(),
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
  getAllSystems,
  getSystem,
  getAllSystemGames,
  getGame,
  insertSystem,
  insertGame,
  updateSystem,
  updateGame,
  deleteSystem,
  deleteGame,
};
