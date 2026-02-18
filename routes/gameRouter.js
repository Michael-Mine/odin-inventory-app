const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controllers/gameController");

gameRouter.get("/:gameId", gameController.getGame);

gameRouter.get(":gameId/update", gameController.updateGameGet);
gameRouter.post(":gameId/update", gameController.updateGamePost);

gameRouter.get(":gameId/delete", gameController.deleteGameGet);
gameRouter.post(":gameId/delete", gameController.deleteGamePost);

module.exports = gameRouter;
