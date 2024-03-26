const fs = require('fs');
const { writeFile } = require('fs/promises');
const path = require('path');
const {
  ERRORDATA,
} = require('../../constants/constants');
const servers = require(path.join(__dirname, '../../../../','servers/Serverx.json'));
const serverPath = path.resolve(__dirname, '../../../../','servers/Serverx.json');

const deleteServer = async (req, res) => {
  const { id } = req.params;
  let deleteServers = {servidores:[]};

  if(!id){
    return res.status(500).json({ msg: ERRORDATA });
  }

  deleteServers.servidores = servers.servidores.filter(server => server.id !== id);
  servers.servidores = [];
  servers.servidores = deleteServers.servidores;
  
  try {
    await writeFile(serverPath, JSON.stringify(deleteServers));
    return res.json({deleteServer, status:200});
  } catch (error) {
    return res
      .status(500)
      .json({msg:error.message});
  }

};

module.exports = {
  deleteServer,
};