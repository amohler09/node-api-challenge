const express = require('express');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();

server.use(express.json());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Api running...</h2>`);
});

module.exports = server;

