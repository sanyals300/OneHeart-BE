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
      // You might want to be more specific with the error message
      return res
        .status(400)
        .json({ error: "Invalid Edit Request: Please check your data." });
    }
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res
        .status(401)
        .json({
          error: "User not found in request context. Please log in again.",
        });
    }

    // Only hash password if it's provided and changed
    if (req.body.password && req.body.password !== loggedInUser.password) {
      const bcrypt = require("bcrypt");
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update fields from req.body
    Object.keys(req.body).forEach((key) => {
      // Only update if the key exists in req.body and is not empty
      if (req.body[key] !== undefined && key !== "_id") {
        // Prevent overwriting _id
        loggedInUser[key] = req.body[key];
      }
    });

    await loggedInUser.save();

    // IMPORTANT CHANGE: Send back the updated user object (filtered)
    const updatedUser = {
      _id: loggedInUser._id,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      emailId: loggedInUser.emailId,
      age: loggedInUser.age,
      gender: loggedInUser.gender,
      about: loggedInUser.about,
      photoUrl: loggedInUser.photoUrl,
      // Add any other fields you store and want the frontend to have
    };

    res.status(200).json(updatedUser); // Send the updated user object
    // Or if you want a message too: res.status(200).json({ message: "Profile updated!", data: updatedUser });
  } catch (err) {
    console.error("Backend Profile Update Error:", err); // Log the actual error
    res.status(400).json({ error: "Error updating profile: " + err.message });
  }
});

module.exports = profileRouter;
