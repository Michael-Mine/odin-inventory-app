const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

// read all systems
indexRouter.get("/", indexController.getSystems);

// create new system form
indexRouter.get("/new-system", indexController.newSystemGet);
indexRouter.post("/new-system", indexController.newSystemPost);

module.exports = indexRouter;
