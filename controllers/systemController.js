const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErr = "must be between 1 and 40 characters.";
const yearErr = "must be between 1972 and 2026.";
const gamepadsErr = "must be between 0 and 50.";

const validateMessage = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
  body("year")
    .trim()
    .isInt({ min: 1972, max: 2026 })
    .withMessage(`Age ${yearErr}`),
  body("gamepads")
    .trim()
    .isInt({ min: 0, max: 50 })
    .withMessage(`Age ${gamepadsErr}`),
];

async function getAllSystemGames(req, res) {
  const systemId = req.params.systemId;
  const games = await db.getAllSystemGames(systemId);
  if (!games) {
    throw new CustomNotFoundError("System has no games");
  }
  res.render("system-games", { games, systemId });
}

async function newGameGet(req, res) {
  const systemId = req.params.systemId;
  const developers = db.getDevelopers();
  res.render("forms/create-game-form", {
    title: "Add New Game",
    systemId,
    developers,
  });
}

const newGamePost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/new-game-form", {
        title: "Add New Game",
        errors: errors.array(),
      });
    }
    const systemId = req.params.systemId;
    const { title, year, developerId } = matchedData(req);
    await db.insertGame({ title, year, systemId, developerId });
    res.redirect("/");
  },
];

async function updateSystemGet(req, res) {
  const system = await db.getSystem(req.params.systemId);

  if (!system) {
    throw new CustomNotFoundError("System not found");
  }
  res.render("forms/update-system-form", { system });
}

const updateSystemPost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/update-system-form", {
        errors: errors.array(),
      });
    }
    const systemId = req.params.systemId;
    const { gamepads } = matchedData(req);

    await db.updateSystem({ gamepads, systemId });
    res.redirect("/");
  },
];

async function deleteSystemGet(req, res) {
  const system = await db.getSystem(req.params.systemId);

  if (!system) {
    throw new CustomNotFoundError("System not found");
  }
  res.render("forms/delete-system", { system });
}

async function deleteSystemPost(req, res) {
  await db.deleteSystem(req.params.systemId);
  res.redirect("/");
}

module.exports = {
  getAllSystemGames,
  newGameGet,
  newGamePost,
  updateSystemGet,
  updateSystemPost,
  deleteSystemGet,
  deleteSystemPost,
};
