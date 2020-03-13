const express = require('express');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();

server.use(logger);
server.use(express.json());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Api running...</h2>`);
});

//  logger middleware
function logger(req, res, next) {
    console.log(`${req.method} method used at route ${req.originalUrl} on ${Date()}`);
  
    next();
  }

module.exports = server;

