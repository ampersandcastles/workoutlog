const router = require("express").Router();
const { response } = require("express");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel, LogModel } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  let { username, passwordhash } = req.body.user;

  try {
    const User = await UserModel.create({
      username,
      passwordhash: bcrypt.hashSync(passwordhash, 13),
    });

    let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: "User created!",
      user: User,
      sessionToken: token,
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Username taken",
      });
    } else {
      res.status(500).json({
        message: "COMPLETE FAILURE",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  let { username, passwordhash } = req.body.user;

  try {
    let loginUser = await UserModel.findOne({
      where: {
        username: username,
      },
    });

    if (loginUser) {
      let passComp = await bcrypt.compare(passwordhash, loginUser.passwordhash);

      if (passComp) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        res.status(200).json({
          user: loginUser,
          message: "User logged in!",
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: "login failed",
        });
      }
    } else {
      res.status(401).json({
        message: "login failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to log user in.",
    });
  }
});

module.exports = router;
