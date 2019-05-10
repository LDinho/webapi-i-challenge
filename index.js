// implement your API here
const express = require('express');

const db = require('./data/db')

const server = express();

server.use(express.json());

const { find, findById, insert, remove } = db;

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
    .catch(() => {
      res.status(500).json({ error: "The user information could not be retrieved." });
    })
});

server.post('/api/users', (req, res) => {
  const newUser = req.body;
  console.log('req body', req.body);

  const { name, bio} = newUser;

  if (!name || !bio) {
    return res.status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  insert(newUser)
    .then((newUser) => {
        res.status(201).json(newUser);
    })
    .catch(() => {
      res.status(500)
        .json({ error: "There was an error while saving the user to the database" });
    })
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  remove(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The user could not be removed" });
    })
});

// listening
server.listen(9090, ()=> {
  console.log('listening on port 9090')

});
