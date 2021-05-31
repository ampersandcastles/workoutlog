const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { LogModel } = require("../models");

router.get("/practice", (req, res) => {
  res.send("This is a route");
});

router.post("/create", validateJWT, async (req, res) => {
  const { description, definition, result } = req.body.log;
  const { owner_id } = req.user;
  const logEntry = {
    description,
    definition,
    result,
    owner: owner_id,
  };
  try {
    const newLog = await LogModel.create(logEntry);
    res.status(200).json(newLog);
  } catch (error) {
    res.status(500).json({ error: error });
  }
  LogModel.create(logEntry);
});

router.get("/about", (req, res) => {
  res.send(`hi`);
});

module.exports = router;
