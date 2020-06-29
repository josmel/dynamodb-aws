const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require('cors');

const router = require('./routes/vehicle.routes.js');

app.use(cors({
  allowedHeaders: ['Accept', 'Authorization', 'Content-Type', 'X-Amz-Date,', 'X-Amz-Security-Token', 'X-Api-Key'],
  maxAge: 600
}));
app.use(bodyParser.json({ strict: false }));

app.get("/", (req, res) => {
  res.send("SWAPI - The Star Wars API - Vehiculos !");
});

app.use('/vehiculos', router);


module.exports.handler = serverless(app);