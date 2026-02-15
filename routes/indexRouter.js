const { Router } = require("express");
const indexRouter = Router();
const controller = require("../controllers/controller");

// read all systems
indexRouter.get("/");

// create new system form (must not be a number)
indexRouter.get("/new-system");
indexRouter.post("/new-system");

module.exports = indexRouter;
