const express = require("express");
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');

const server = express();

server.name = 'LOGS';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use((req, res, next)=>{
  // res.header('Access-Control-Allow-Origin', 'http://localhost:'+process.env.BACKSERVER || 4321);
  res.header('Access-Control-Allow-Origin', 'http://10.6.3.227:'+process.env.BACKSERVER || 4321);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/',routes);
// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
