// implement your API here
const express = require('express');

const db = require('./data/db')

const server = express();

const { find, findById } = db;

server.get('/', (req, res) => {
  console.log('inside get');
  // res.send('<h4>Hello World</h4>');
  res.json("The server is running!");

});

server.get('/api/users', (req, res) => {
  find()
    .then((users) => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(500)
          .json({
            error: "The users information could not be retrieved."
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    })
});

// listening
server.listen(9090, ()=> {
  console.log('listening on port 9090')

});
