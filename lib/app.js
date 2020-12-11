const express = require('express');
const Tree = require('./models/trees');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ climb: 'the trees' });
});

app.post('/api/v1/trees', (req, res, next) => {
  Tree
    .insert(req.body)
    .then(tree => res.send(tree))
    .catch(next);

  console.log('hello');
});

module.exports = app;
