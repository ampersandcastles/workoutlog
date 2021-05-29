const Express = require("express");
const router = Express.Router();

router.get("/practice", (req, res) => {
  res.send("This is a route");
});

router.get("/about", (req, res) => {
  res.send(`hi`);
});

module.exports = router;
