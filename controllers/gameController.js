const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

async function getGame(req, res) {
  const gameId = req.params.gameId;
  const game = await db.getGame(gameId);
  if (!game) {
    throw new CustomNotFoundError("Game not found");
  }
  res.render("game", { game: game[0] });
}

async function updateGameGet(req, res) {
  const gameId = req.params.gameId;
  const game = await db.getGame(gameId);
  if (!game) {
    throw new CustomNotFoundError("Game not found");
  }
  const systems = await db.getAllSystems();
  res.render("forms/update-game-form", { game: game[0], systems });
}

async function updateGamePost(req, res) {
  const gameId = req.params.gameId;
  const systemId = req.body.systemId;
  await db.updateGame({ systemId, gameId });
  res.redirect("/game/" + gameId);
}

async function deleteGameGet(req, res) {
  const gameId = req.params.gameId;
  const game = await db.getGame(gameId);
  if (!game) {
    throw new CustomNotFoundError("Game not found");
  }
  res.render("forms/delete-game", { game: game[0] });
}

async function deleteGamePost(req, res) {
  const gameId = req.params.gameId;
  await db.deleteGame(gameId);
  res.redirect("/");
}

module.exports = {
  getGame,
  updateGameGet,
  updateGamePost,
  deleteGameGet,
  deleteGamePost,
};
