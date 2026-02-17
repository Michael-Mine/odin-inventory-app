const pool = require("./pool");

async function getAllSystems() {
  const { rows } = await pool.query(
    "SELECT * FROM systems WHERE retiredOn IS NULL",
  );
  console.log(rows);
  return rows;
}

//can still access directly if retired, to view games on retired system
async function getSystem(systemId) {
  const { rows } = await pool.query("SELECT * FROM systems WHERE id = ($1)", [
    systemId,
  ]);
  return rows;
}

async function getAllSystemGames(systemId) {
  await pool.query(
    "SELECT games.title, games.year, systems.name AS system, developers.name AS developer FROM games INNER JOIN systems ON games.system = systems.id INNER JOIN developers ON games.developer = developers.id WHERE system = ($1) AND games.retiredOn IS NULL",
    [systemId],
  );
}

// can still access directly if retired, to view details
async function getGame(gameId) {
  const { rows } = await pool.query(
    "SELECT games.title, games.year, systems.name AS system, developers.name AS developer, games.retiredOn FROM games INNER JOIN systems ON games.system = systems.id INNER JOIN developers ON games.developer = developers.id WHERE games.id = ($1)",
    [gameId],
  );
  return rows;
}

async function getDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

async function insertDeveloper(name) {
  await pool.query("INSERT INTO developers (name) VALUES ($1)", [name]);
}

async function insertSystem({ name, gamepads }) {
  await pool.query("INSERT INTO systems (name, gamepads) VALUES ($1, $2)", [
    name,
    gamepads,
  ]);
}

async function insertGame({ title, year, systemId, developerId }) {
  await pool.query(
    "INSERT INTO games (title, year, system, developer) VALUES ($1, $2, $3, $4)",
    [title, year, systemId, developerId],
  );
}

async function updateSystem({ gamepads, systemId }) {
  await pool.query("UPDATE systems SET gamepads = ($1) WHERE id = ($2)", [
    gamepads,
    systemId,
  ]);
}

async function updateGame({ systemId, gameId }) {
  await pool.query("UPDATE games SET system = ($1) WHERE id = ($2)", [
    systemId,
    gameId,
  ]);
}

async function deleteSystem(systemId) {
  await pool.query("UPDATE systems SET retiredOn = ($1) WHERE id = ($2)", [
    new Date(),
    systemId,
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
  insertDeveloper,
  insertSystem,
  insertGame,
  updateSystem,
  updateGame,
  deleteSystem,
  deleteGame,
};
