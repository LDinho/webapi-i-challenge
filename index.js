// implement your API here
const express = require('express');

const db = require('./data/db')

const server = express();

const { find } = db;

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

// listening
server.listen(9090, ()=> {
  console.log('listening on port 9090')

});
