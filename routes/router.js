const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

// read all systems
router.get("/");

// create new system form
router.get("/new-system");
router.post("/new-system");

// read system and all games
router.get("/:system-name");

// update form, delete system.
router.get("/:system-name/update");
router.post("/:system-name/update");

// create new game form
router.get("/:system-name/new-game");
router.post("/:system-name/new-game");

//read game
router.get("/:gameId");

// update form, delete game.
router.get("/:gameId/update");
router.post("/:gameId/update");

module.exports = router;
