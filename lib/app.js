const express = require('express');
const app = express();
app.use = (express.json());

app.get('/', (req, res, next) => {
  console.log('Hello to the trees and birds.');
  res.send({ climb: 'the trees' });
});
  

module.exports = app;
