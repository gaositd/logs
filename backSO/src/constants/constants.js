const ERRORDATA = "Error en datos enviados, favor de revisar";
const CONTAINERSNAMES = 'sudo docker ps --format "table {{.ID}}\\t{{.Names}}"';
const LOGS = `sudo docker logs --tail 5 mysql55`;

const TAIL = 'logs --tail';
const CAD_VACIA = '        ';

const IP_SERVER_ERROR = 'Formato incorrecto de la IP, favor de revisar';

module.exports = {
  ERRORDATA,
  CONTAINERSNAMES,
  LOGS,
  TAIL,
  CAD_VACIA,
  IP_SERVER_ERROR,
};