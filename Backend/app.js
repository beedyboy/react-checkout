const express = require('express');
const cors = require('cors');

const { routemanager } = require('./routes/routes');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      console.log(`Origin ${origin} is being granted CORS access`);
      callback(null, true);
    },
  })
);

app.use(express.json());

app.use(routemanager);

app.get('/health', (req, res) => {
  res.status(200).json('Server up!');
});

module.exports = { app };
