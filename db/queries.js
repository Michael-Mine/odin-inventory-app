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
    "SELECT * FROM games INNER JOIN systems ON game.system = system.id INNER JOIN developers ON game.developer = developer.id WHERE system = ($1) AND retiredOn = 'No'",
    [systemId],
  );
}

// still access but show as retired?
async function getGame(gameId) {
  const { rows } = await pool.query(
    "SELECT * FROM games INNER JOIN systems ON game.system = system.id INNER JOIN developers ON game.developer = developer.id WHERE id = ($1)",
    [gameId],
  );
  return rows;
}

async function getDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

async function insertSystem({ name, gamepads }) {
  await pool.query(
    "INSERT INTO systems (name, gamepads, retiredOn) VALUES ($1, $2, $3)",
    [name, gamepads, "No"],
  );
}

async function insertDeveloper(name) {
  await pool.query("INSERT INTO developers (name) VALUES ($1)", [name]);
}

async function insertGame({ title, year, systemId, developerId }) {
  await pool.query(
    "INSERT INTO games (title, year, system, developer, retiredOn) VALUES ($1, $2, $3, $4, $5)",
    [title, year, systemId, developerId, "No"],
  );
}

async function updateSystem({ gamepads, systemId }) {
  await pool.query("UPDATE system SET gamepads = ($1) WHERE id = ($2)", [
    gamepads,
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
  getDevelopers,
  insertSystem,
  insertDeveloper,
  insertGame,
  updateSystem,
  updateGame,
  deleteSystem,
  deleteGame,
};
