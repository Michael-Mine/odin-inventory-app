const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErr = "must be between 1 and 20 characters.";

const validateMessage = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Name ${lengthErr}`),
];

async function getAllSystems(req, res) {
  const systems = await db.getAllSystems();
  res.render("index", { title: "Mr Mine's Arcade Bar Inventory App", systems });
}

async function newSystemGet(req, res) {
  res.render("create-system-form", { title: "Add New System" });
}

const newSystemPost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("create-system-form", {
        title: "Add New System",
        errors: errors.array(),
      });
    }
    const { name, gamepads } = matchedData(req);
    await db.insertSystem({ name, gamepads });
    res.redirect("/");
  },
];

async function newDeveloperGet(req, res) {
  res.render("create-developer-form", { title: "Add New Developer" });
}

const newDeveloperPost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("create-developer-form", {
        title: "Add New Developer",
        errors: errors.array(),
      });
    }
    const { name } = matchedData(req);
    await db.insertDeveloper({ name });
    res.redirect("/");
  },
];

module.exports = {
  getAllSystems,
  newSystemGet,
  newSystemPost,
  newDeveloperGet,
  newDeveloperPost,
};
