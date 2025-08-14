const express = require('express');
const { userAuth } = require('../middlewares/authmiddle');
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received",userAuth,async (req,res) => {
try{
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "photoUrl"]);
    res.json({
        message: "Hooray we have displayed all the requests that are pending",
        data: connectionRequest
    });


}
catch(err){
    res.status(400).send("ERROR: " + err.message);
}
});

userRouter.get("/user/connections", userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {toUserId:loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"}
            ],
        }).populate("fromUserId",["firstName", "lastName", "age", "gender", "photoUrl"]);
        const data = connectionRequest.map((row) => row.fromUserId);
        res.json({data});

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})




module.exports = userRouter;