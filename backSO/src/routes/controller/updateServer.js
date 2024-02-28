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
    server,
    enviroment,
    disable,
  } = req.body;

  if (server.length === 0 || enviroment.length === 0 ) {
    console.log(ERRORDATA);
    return res.status(500).json({ msg: ERRORDATA });
  }

  if(!IPRegex.test(server)){
    console.log(IP_SERVER_ERROR,);
    return res.status(500).json({ msg: IP_SERVER_ERROR, });
  }

  if(disable === null || disable === undefined){
    disable = true;
  }

  const serversUpdate = servers.servidores.map(server => {
    if(server.id === id){
      server.enviroment = enviroment;
      server.disable = disable;
    }

    return server;
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