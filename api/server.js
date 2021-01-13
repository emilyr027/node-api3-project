const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/users-router');



const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use((req, res, next) => {
  console.log('welcome to my app')
  next()
});
// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

const pipeline = [logger]
server.use('/api/posts/', pipeline, postsRouter);
server.use('/api/users/', usersRouter);




server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

function logger(req, res, next) {
  let time = new Date()
  console.log(req.method, req.url, time)

  //request method, request url, and a timestamp
  next();
}
