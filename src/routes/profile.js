const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/authmiddle");
const validateProfileEditData = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("User not found sorry");
  }
});

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res.status(401).json({ error: "User not found in request" });
    }

    if (req.body.password) {
      const bcrypt = require("bcrypt");
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send("Your profile has been updated successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
