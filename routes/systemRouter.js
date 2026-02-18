const { Router } = require("express");
const systemRouter = Router();
const systemController = require("../controllers/systemController");

// read system and all games
systemRouter.get("/:systemId", systemController.getAllSystemGames);

// create new game form
systemRouter.get("/:systemId/new-game", systemController.newGameGet);
systemRouter.post("/:systemId/new-game", systemController.newGamePost);

// update form, delete system.
systemRouter.get("/:systemId/update", systemController.updateSystemGet);
systemRouter.post("/:systemId/update", systemController.updateSystemPost);

systemRouter.get("/:systemId/delete", systemController.deleteSystemGet);
systemRouter.post("/:systemId/delete", systemController.deleteSystemPost);

module.exports = systemRouter;
