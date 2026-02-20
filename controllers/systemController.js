const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErr = "must be between 1 and 40 characters.";
const yearErr = "must be between 1972 and 2026.";
const gamepadsErr = "must be between 0 and 50.";

const validateMessageNewGame = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
  body("year")
    .trim()
    .isInt({ min: 1972, max: 2026 })
    .withMessage(`Year ${yearErr}`),
  body("developerId").trim(),
];

const validateMessageUpdateSystem = [
  body("gamepads")
    .trim()
    .isInt({ min: 0, max: 50 })
    .withMessage(`Gamepads ${gamepadsErr}`),
];

async function getAllSystemGames(req, res) {
  const systemId = req.params.systemId;
  const system = await db.getSystem(systemId);
  const games = await db.getAllSystemGames(systemId);
  if (!games) {
    throw new CustomNotFoundError("System has no games");
  }
  res.render("system-games", { system: system[0], games, systemId });
}

async function newGameGet(req, res) {
  const systemId = req.params.systemId;
  const developers = await db.getDevelopers();
  res.render("forms/create-game-form", {
    title: "Add New Game",
    systemId,
    developers,
  });
}

const newGamePost = [
  validateMessageNewGame,
  async (req, res) => {
    const systemId = req.params.systemId;
    const developers = await db.getDevelopers();
    const system = await db.getSystem(systemId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/create-game-form", {
        title: "Add New Game",
        systemId,
        developers,
        system: system[0],
        errors: errors.array(),
      });
    }
    const { title, year, developerId } = matchedData(req);
    await db.insertGame({ title, year, systemId, developerId });
    res.redirect("/");
  },
];

async function updateSystemGet(req, res) {
  const systemId = req.params.systemId;
  const system = await db.getSystem(systemId);
  if (!system) {
    throw new CustomNotFoundError("System not found");
  }
  res.render("forms/update-system-form", { system: system[0] });
}

const updateSystemPost = [
  validateMessageUpdateSystem,
  async (req, res) => {
    const systemId = req.params.systemId;
    const system = await db.getSystem(systemId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).render("forms/update-system-form", {
        system: system[0],
        errors: errors.array(),
      });
    }
    const { gamepads } = matchedData(req);
    await db.updateSystem({ gamepads, systemId });
    res.redirect("/");
  },
];

async function deleteSystemGet(req, res) {
  const systemId = req.params.systemId;
  const system = await db.getSystem(systemId);

  if (!system) {
    throw new CustomNotFoundError("System not found");
  }
  res.render("forms/delete-system", { system: system[0], error: "" });
}

async function deleteSystemPost(req, res) {
  const systemId = req.params.systemId;
  const passwordInput = req.body.password;

  if (passwordInput === process.env.DELETE_PASS) {
    await db.deleteSystem(systemId);
    res.redirect("/");
  } else {
    const system = await db.getSystem(systemId);
    res.status(400).render("forms/delete-system", {
      system: system[0],
      error: "Incorrect Password",
    });
  }
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
