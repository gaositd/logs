const ssh2 = require("ssh2");
const {
  ERRORDATA,
  CONTAINERSNAMES,
  CAD_VACIA,
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
    let namesObj = [];

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
                const containerIdRegex = /^(?:[0-9a-fA-F]{2}){1,12}$/;
                let tmp = [];

                arrNames = resultData.split("\r\n");
                let filteredNames = arrNames.filter(name => {
                  tmp = name.split(CAD_VACIA);//divide la posición actual

                  for(let i = 0; i < tmp.length; i++){//recorre el arreglo anterior
                    if(containerIdRegex.test(tmp[i])){//busca por posición un true
                      //regresa el valor actual del filtro ver const filteredNames
                      return name;
                    }
                  }
                });

                arrNames = [];
                arrNames = filteredNames;
                filteredNames = [];
                
                arrNames.forEach(names => {
                  filteredNames = names.split(CAD_VACIA);
                    namesObj.push({
                      CONTAINER_ID: filteredNames[0],
                      name:filteredNames[1],
                    });
                });

                return res.json({
                  namesObj,
                  code: 200,
                });
                client.end();
              })
              .on("data", (data) => {
                  resultData = resultData + data;                
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