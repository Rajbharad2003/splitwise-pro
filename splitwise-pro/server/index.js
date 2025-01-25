const express = require('express');
const app = express();
const client = require('./db/config');
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});