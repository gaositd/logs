const fs = require('fs');
const path = require('path');
const {
  ERRORDATA,
} = require('../../constants/constants');
const servers = require(path.join(__dirname, '../../../../','servers/Serverx.json'));
const serverPath = path.resolve(__dirname, '../../../../','servers/Serverx.json');

const deleteServer = async (req, res) => {
  const { id } = req.body;

  if(!id){
    console.log(ERRORDATA);
    return res.status(500).json({ msg: ERRORDATA });
  }

  const deleteServers = servers.servidores.filter(server => {
    return server.id !== id
  });

  try {
    fs.writeFileSync(serverPath, JSON.stringify(deleteServers));
    return res.json({
      deleteServers,
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
  deleteServer,
};