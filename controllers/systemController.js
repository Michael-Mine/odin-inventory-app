const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const lengthErr = "must be between 1 and 40 characters.";
const yearErr = "must be between 1972 and 2026.";

const validateMessage = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
  body("year")
    .trim()
    .isInt({ min: 1972, max: 2026 })
    .withMessage(`Age ${yearErr}`),
  body("new-developer")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
];

async function getAllSystemGames(req, res) {
  const systemId = req.params.systemId;
  const games = await db.getAllSystemGames(req.params.systemId);

  if (!games) {
    throw new CustomNotFoundError("System has no games");
  }
  res.render("system-games", { games, systemId });
}

async function newGameGet(req, res) {
  res.render("create-game-form", { title: "Add New Game" });
}

const newGamePost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new-game-form", {
        title: "Add New Game",
        errors: errors.array(),
      });
    }
    const { title, year, developer } = matchedData(req);
    await db.insertGame({ title, year, developer });
    res.redirect("/");
  },
];

async function updateSystemGet(req, res) {
  const system = await db.getSystem(req.params.systemId);

  if (!system) {
    throw new CustomNotFoundError("System not found");
  }
  res.render("update-system-form", { system });
}

async function updateSystemPost(req, res) {
  const systemId = req.params.gameId;
  const { gamepad } = matchedData(req);

  await db.updateSystem({ gamepad, systemId });
  res.redirect("/:systemId");
}

async function deleteSystemGet(req, res) {
  const system = await db.getSystem(req.params.systemId);

  if (!system) {
    throw new CustomNotFoundError("System not found");
  }
  res.render("delete-system", { system });
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
