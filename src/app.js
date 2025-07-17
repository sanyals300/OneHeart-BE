const express = require('express');

const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

app.use(express.json());
// Dynamic Data sent in DB
app.post("/signup", async (req,res) => {
  const user = new User(req.body);

  try {
    await user.save();
  res.send("User added to the database successfully");
  }catch (err){
    res.status(400).send("Errrorwa hogayil sorryyyyy"+ err.message);
  }
  
});
//Showing feed with get method

app.get("/user", async(req,res) => {
  try{
   const user = await User.find({emailId: req.body.emailId}); 
   res.send(user);
  }
  catch (err){
    res.status(400).send("User nai pacheeeee sorryyyyy");
  }
});

connectDB()
.then(() => {
    console.log("Database Connection Established");
    app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
})
.catch(() => {
    console.log("Database Connection not Successfull");
});

  