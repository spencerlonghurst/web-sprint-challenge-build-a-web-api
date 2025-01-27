const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use(express.json());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);



server.get('/', (req, res) => {
  res.send('This is the working server at /')
})

server.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'Error retreiving the thingys',
    // stack: err.error.stack
  })
})

server.use('*', (req, res) => {
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` })
})



module.exports = server;

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!