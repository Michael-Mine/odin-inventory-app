const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

async function getGame(req, res) {
  const game = await db.getGame(req.params.gameId);
  if (!game) {
    throw new CustomNotFoundError("Game not found");
  }
  res.render("game", { game: game[0] });
}

async function updateGameGet(req, res) {
  const game = await db.getGame(req.params.gameId);
  if (!game) {
    throw new CustomNotFoundError("Game not found");
  }
  const systems = await db.getAllSystems();
  res.render("update-game-form", { game: game[0], systems });
}

const updateGamePost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("game-update-form", {
        game: game[0],
        errors: errors.array(),
      });
    }
    const gameId = req.params.gameId;
    const { system } = matchedData(req);

    await db.updateGame({ system, gameId });
    res.redirect("/" + gameId);
  },
];

async function deleteGameGet(req, res) {
  const game = await db.getGame(req.params.gameId);
  if (!game) {
    throw new CustomNotFoundError("Game not found");
  }
  res.render("delete-game", { game: game[0] });
}

async function deleteGamePost(req, res) {
  await db.deleteGame(req.params.gameId);
  res.redirect("/");
}

module.exports = {
  getGame,
  updateGameGet,
  updateGamePost,
  deleteGameGet,
  deleteGamePost,
};
