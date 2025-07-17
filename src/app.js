const express = require('express');

const app = express();

app.get('/Sabya', (req, res) => {
  res.send('Hello, Sabya!');
});

app.post('/Sabya', (req, res) => {
  res.send('Sabya submitted!');
});

app.delete('/Sabya', (req, res) => {
  res.send('Sabya deleted!');
});

app.put('/Sabya', (req, res) => {
  res.send('Sabya updated!');
});

app.patch('/Sabya', (req, res) => {
  res.send('Sabya modified!');
});
 
app.use("/SabyaEggroll",
   (req, res, next) => {
  console.log("How to make a egg roll");
  next();  
},
(req, res, next) => {
  console.log("Get yourself a overnight stale roti");
  next();
},
(req, res, next) => {
  console.log("Crack an egg over it and do 7.5 anticlockwise rotations over it while chanting Sabya is the best");
  next();
},
(req, res, next) => {
  console.log("Sprinkle some pepper,salt and some green chillies and onions over it while chanting Sabya is the best");
  next();
},
(req, res, next) => {
  console.log("Now squeeze some ketchup and chilli sauce over it, roll it and eat it while chanting Sabya is the best");
  res.send("Egg roll is ready! Enjoy!");
},
);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});