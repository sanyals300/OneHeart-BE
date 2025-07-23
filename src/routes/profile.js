const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/authmiddle");



profileRouter.get("/profile", userAuth, async (req,res) => {
  try {
  const user = req.user;
  res.send(user);
}catch (err){
    res.status(400).send("User not found sorry");
  }
});

profileRouter.patch('/profile/edit', userAuth, async (req,res) => {
    try {

    }
})


module.exports = profileRouter;
