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

const findServerById = (req, res) => {
  const { id } = req.params;
  
  for (const server of servidores) {
    if(server.id === id){
      return res.status(200).json(server);
    }
  }
  return res.status(404).json({ message: 'Server not found' });
}

const findServerByName = (nameServer) => {
  return servidores.filter(server => server.nameServer.toUpperCase() === nameServer.toUpperCase());
}

module.exports = {
  findServer,
  findServerById,
  findServerByName,
}