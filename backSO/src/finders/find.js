const fs = require('fs');
const path = require('path');
const servers = require(path.join(__dirname, '../../../','servers/Serverx.json'));

const { servidores } =servers;

const findServer = (ipServer, nameServer, ambiente) => {//busca todo en todos los servidores
  let returnNameServer;

  servidores.find(server => {
    if(server.ipServer === ipServer && server.nameServer.toUpperCase() === nameServer.toUpperCase() &&server.ambiente.toUpperCase() === ambiente.toUpperCase()){
      returnNameServer = server.nameServer;
    }
  });

  return returnNameServer;
}

const findServerById = (id) => {
  return servidores.find(server => server.id === id);
}

const findServerByName = (nameServer) => {
  return servidores.filter(server => server.nameServer.toUpperCase() === nameServer.toUpperCase());
}

module.exports = {
  findServer,
  findServerById,
  findServerByName,
}