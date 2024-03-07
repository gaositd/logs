const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const {
  ERRORDATA,
  IP_SERVER_ERROR,
  FOUND_SERVER,
} = require('../../constants/constants');
const servers = require(path.join(__dirname, '../../../../','servers/Serverx.json'));
const serverPath = path.resolve(__dirname, '../../../../','servers/Serverx.json');
const { findServer } = require('../../finders/find');

const IPRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
let data = {};

const postNewServer = async (req, res) => {
  const {
    ipServer, // IP
    nameServer,
    ambiente,
    habilitado,
  } = req.body;
  
  if (ipServer.length === 0 || ipServer === null || ipServer === undefined ) {
    console.log(ERRORDATA);
    return res.status(500).json({ msg: ERRORDATA });
  }

  if (nameServer.length === 0 || nameServer === null || nameServer === undefined ) {
    console.log(ERRORDATA);
    return res.status(500).json({ msg: ERRORDATA });
  }

  if (ambiente.length === 0 || ambiente === null || ambiente === undefined ) {
    console.log(ERRORDATA);
    return res.status(500).json({ msg: ERRORDATA });
  }

  if(!IPRegex.test(ipServer)){
    console.log(IP_SERVER_ERROR,);
    return res.status(500).json({ msg: IP_SERVER_ERROR, });
  }

  if(habilitado === null){
    habilitado = true;
  }
  
  const findServers = findServer(ipServer, nameServer, ambiente);
  if(findServers){
    console.log(`${FOUND_SERVER} ${findServers}`);
    return res.status(409).json({ msg: `${FOUND_SERVER} ${findServers}` });
  }

  data ={
    id:`${randomUUID()}`,
    ipServer:`${ipServer}`,
    nameServer:`${nameServer}`,
    ambiente:`${ambiente}`,
    habilitado:habilitado
  };

  try {
    servers.servidores.push(data);
    fs.writeFileSync(serverPath, JSON.stringify(servers));

    return res.json({
      data,
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
  postNewServer,
};
