const express = require("express");
const os = require ('os');
const dotenv = require('dotenv');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');

const server = express();
const netInterfaces = os.networkInterfaces();
let ipServer = '';

dotenv.config();

for(net in netInterfaces){//obtiene la IP del servidor (tarjeta de red física)
  const netInterface = netInterfaces[net];
  let flag = false;
  for (const interface of netInterface) {
    if(interface.netmask.includes(process.env.NETMASK)){
      ipServer = interface.address.trim();
      ipServer = ipServer.trim();
      flag = true
      break;
    }
    if(ipServer === interface.address) { 
      console.log(ipServer);
      break;
    };
  }
}

server.name = process.env.SERVERNAME;

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', `*`);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  // res.send('OK');
  next();
});

server.use('/',routes);
// Error catching endware.
server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
