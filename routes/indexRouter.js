const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getAllSystems);

indexRouter.get("/new-system", indexController.newSystemGet);
indexRouter.post("/new-system", indexController.newSystemPost);

indexRouter.get("/new-developer", indexController.newDeveloperGet);
indexRouter.post("/new-developer", indexController.newDeveloperPost);

module.exports = indexRouter;
