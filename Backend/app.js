const express = require('express');

const { routemanager } = require('./routes/routes');

const app = express();

app.use(express.json());

app.use(routemanager);

app.get('/health', (req, res) => {
  res.status(200).json('Server up!');
});

module.exports = { app };
