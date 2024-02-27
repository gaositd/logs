const fs = require('fs');
const { randomUUID } = require('crypto');
const {
  ERRORDATA,
  SERVER_PATH,
} = require('../../constants/constants');
 const servers = require('../../../../servers/Serverx.json');

let id;
let data = [];

const postNewServer = async (res, req) => {
  const fileName = 'SERVERS.json';
  const {
    server, // IP
    enviroment,
    disable,
  } = req.body;
  
  if (server.length === 0 || enviroment.length === 0 ) {
    console.log(ERRORDATA);
    return res.status(500).json({ msg: ERRORDATA });
  }

  if(disable === null){
    disable = true;
  }

  data = [
    {
      id:`${randomUUID()}`,
      server:`${server}`,
      enviroment:`${enviroment}`,
      disable:`${disable}`
    }
  ];

  try {
    // await fs.appendFile(`${servers}/${fileName}`, data, (err) => {
    //   if(err){
    //     console.log(err);
    //     return res
    //     .status(500)
    //     .json({msg:error});
    //   }
    // });

    await fs.appendFile(`${servers}/${fileName}`, data, {flag: w});
    return res.json({
      data,
      code:200,
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