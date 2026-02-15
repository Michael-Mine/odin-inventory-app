const { Router } = require("express");
const gameRouter = Router();
const controller = require("../controllers/indexController");

//read game
gameRouter.get("/games/:gameId");

// update form, delete game.
gameRouter.get("/games/:gameId/update");
gameRouter.post("/games/:gameId/update");

module.exports = gameRouter;
