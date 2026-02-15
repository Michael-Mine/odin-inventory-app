const { Router } = require("express");
const systemRouter = Router();
const controller = require("../controllers/controller");

// read system and all games
systemRouter.get("/system/:systemId");

// update form, delete system.
systemRouter.get("/system/:systemId/update");
systemRouter.post("/system/:systemId/update");

// create new game form
systemRouter.get("/system/:systemId/new-game");
systemRouter.post("/system/:systemId/new-game");

module.exports = systemRouter;
