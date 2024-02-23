const ssh2 = require("ssh2");
const {
  ERRORDATA,
  CONTAINERSNAMES,
  CONTAINER_ID,
} = require("../../constants/constants.js");

const config = {
  strict: true,
};
const client = new ssh2.Client(config);
let arrNames = [];

function getContainersNames(req, res) {
  const {
    server, // IP
    user,
    password,
  } = req.body;

  if (server.length === 0 || user.length === 0 || password.length === 0) {
    console.log(ERRORDATA);
    return res.status(500).json({ msg: ERRORDATA });
  }

  try {
    let resultData = "";

    client
      .on("ready", () => {
        client.shell(
          {
            sudo: true,
            password,
          },
          (err, stream) => {
            if (err) {
              throw err;
            }

            stream
              .on("close", () => {
                let tmp = arrNames.filter(data =>{
                  return data.includes(CONTAINER_ID);
                });

                arrNames = [];
                arrNames = tmp;
                tmp = [];
                for(let i = 0; arrNames.length; i++){
                  if(/^[0-9A-F]+$/gi.test(arrNames[i])){
                    tm password.push(arrNames[i]);
                  }
                }


                return res.json({
                  resultData,
                  code: 200,
                });
                client.end();
              })
              .on("data", (data) => {
                if(data.toString().length > 10){
                  arrNames.push(data.toString());
                  resultData = resultData + data
                }
                
              });

            // Envía el comando y espera 2 segundos antes de cerrar el stream.
            stream.end(`${CONTAINERSNAMES}\nexit\n`);
            setTimeout(() => stream.end(), 2000);
          }
        );
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