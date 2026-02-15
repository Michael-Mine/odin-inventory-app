const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErr = "must be between 1 and 20 characters.";

const validateMessage = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Name ${lengthErr}`),
];

async function getSystems(req, res) {
  const systems = await db.getSystems();
  res.render("index", { title: "Mr Mine's Arcade Bar Inventory App", systems });
}

async function newSystemGet(req, res) {
  res.render("form-new-system", { title: "Add New System" });
}

const newSystemPost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form-new-system", {
        title: "Add New System",
        errors: errors.array(),
      });
    }
    const { name } = matchedData(req);
    await db.insertSystem({ name });
    res.redirect("/");
  },
];

module.exports = {
  getSystems,
  newSystemGet,
  newSystemPost,
};
