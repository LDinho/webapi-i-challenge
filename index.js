// implement your API here

const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');

});


// listening
server.listen(9090, ()=> {
  console.log('listening on port 9090')

});
