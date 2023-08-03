const express = require('express')
const router = express.Router()
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!(email && password && userName)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exist. please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        "apple",
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    } else {
      res.status(400).send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router