const express = require('express');
const Bird = require('./models/birds');
const Tree = require('./models/trees');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ climb: 'the trees' });
});

// Tree endpoints
app.post('/api/v1/trees', (req, res, next) => {
  Tree
    .insert(req.body)
    .then(tree => res.send(tree))
    .catch(next);
});

app.get('/api/v1/trees', (req, res, next) => {
  Tree
    .find()
    .then(tree => res.send(tree))
    .catch(next);
});

app.get('/api/v1/trees/:id', (req, res, next) => {
  Tree
    .findById(req.params.id)
    .then(tree => res.send(tree))
    .catch(next);
});

app.put('/api/v1/trees/:id', (req, res, next) => {
  Tree
    .update(req.params.id, req.body)
    .then(tree => res.send(tree))
    .catch(next);
});

app.delete('/api/v1/trees/:id', (req, res, next) => {
  Tree
    .delete(req.params.id)
    .then(tree => res.send(tree))
    .catch(next);
});

// Bird endpoints
app.post('/api/v1/birds', (req, res, next) => {
  Bird
    .insert(req.body)
    .then(bird => res.send(bird))
    .catch(next);
});

app.get('/api/v1/birds', (req, res, next) => {
  Bird
    .find()
    .then(bird => res.send(bird))
    .catch(next);
});

app.get('/api/v1/birds/:id', (req, res, next) => {
  Bird
    .findById(req.params.id)
    .then(bird => res.send(bird))
    .catch(next);
});

app.put('/api/v1/birds/:id', (req, res, next) => {
  Bird
    .update(req.params.id, req.body)
    .then(bird => res.send(bird))
    .catch(next);
});

app.delete('/api/v1/birds/:id', (req, res, next) => {
  Bird
    .delete(req.params.id)
    .then(bird => res.send(bird))
    .catch(next);
});





module.exports = app;
