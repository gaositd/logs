const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const {
  ERRORDATA,
  IP_SERVER_ERROR,
} = require('../../constants/constants');
const servers = require(path.join(__dirname, '../../../../','servers/Serverx.json'));
const serverPath = path.resolve(__dirname, '../../../../','servers/Serverx.json');

const IPRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const putUpdateServer = (req, res) => {
  let {
    id,
    nameServer,
    ipServer,
    ambiente,
    habilitado,
  } = req.body;
  let serversUpdate = {servidores:[]};

  if (nameServer.length === 0 || nameServer.length === 0 ) {
    return res.status(500).json({ msg: ERRORDATA });
  }

  if(!IPRegex.test(ipServer)){
    return res.status(500).json({ msg: IP_SERVER_ERROR, });
  }

  if(habilitado === null || habilitado === undefined){
    disable = true;
  }

  servers.servidores.filter(server => {
    const { habilitado } = serversUpdate.servidores;
    if(server.id !== id){
      serversUpdate.servidores.habilitado = !habilitado;
      serversUpdate.servidores.push(server);
    }
  });

  try {
    fs.writeFileSync(serverPath, JSON.stringify(serversUpdate));
    return res.json({
      serversUpdate,
      status:200,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({msg:error});
  }
};

module.exports = {
  putUpdateServer,
};