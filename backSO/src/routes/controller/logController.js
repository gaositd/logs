const ssh2 = require("ssh2");
const {
  ERRORDATA,
  LOGS,
  CONTAINER,
} = require("../../constants/constants.js");

const config = {
  strict: true,
};
const client = new ssh2.Client(config);

function getLogDocker(req, res) {//obtiene los logs de docker
  const { 
      server,        //IP  
      user,
      password,
      linesQuantity,  //N Lineas a leer
      dockerContainer,//nombre Contenedor
  } = req.body;

  if ( server.length === 0 || user.length === 0 || password.length === 0 || linesQuantity.length === 0 || dockerContainer.length == 0 ) {
    return res.status(500).json({ msg: ERRORDATA });
  }

  try {

    client
      .on('ready', () => {
        client.shell({
          sudo: true,
          password,
        }, (err, stream) => {

          if (err) {
            throw err;
          }
          let resultData
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
          stream.end(`${LOGS}\nexit\n`)
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
  getLogDocker,
};