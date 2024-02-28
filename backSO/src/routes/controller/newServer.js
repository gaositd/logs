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
let id;
let data = {};

const postNewServer = async (req, res) => {
  const {
    server, // IP
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

  if(disable === null){
    disable = true;
  }
  console.log(serverPath);
  data ={
    id:`${randomUUID()}`,
    server:`${server}`,
    enviroment:`${enviroment}`,
    disable:`${disable}`
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
