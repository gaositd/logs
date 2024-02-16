const ssh2 = require('ssh2');
const {
  ERRORDATA,
  CONTAINERSNAMES,
} = require ('../../constants/constants');
const config = { strict: true };
const client = new ssh2.Client(config);

const getContainersNames = (req, res) =>{//obtiene los nombre de los contenedores
  const { 
    server,         //IP  
    user,
    password,
    dockerContainer,//nombre Contenedor
} = req.body;

if ( server.length === 0 || user.length === 0 || password.length === 0 ) {
  console.log(ERRORDATA);

  return res.status(500).json({ msg: ERRORDATA });
}

try {
  let resultData

  client
    .on('ready', () => {
      client.shell({
        sudo: true,
        password,
      }, (err, stream) => {

        if (err) {
          throw err;
        }
        stream
          .on('close', () => {
            return res
              .json({
                resultData,
                code:200
              });
            client.end();
          })
          .on('data', (data) => {
            data.length >=30
              ? resultData += data
              :null;
          });
        stream.end(`${CONTAINERSNAMES}\nexit\n`)
      });
    })
    .connect({
      host: server,
      port: process.env.REMOTEPORT,
      username: user,
      password: password,
    });

} catch (error) {
  console.error(error);
  return res.status(500).json({ msg: error });
}
}

module.exports = {
  getContainersNames,
};