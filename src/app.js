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
 
app.use("/Sabya",(req, res) => {
  res.send('Hello, GTS!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});