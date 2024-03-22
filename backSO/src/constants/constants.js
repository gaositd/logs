const ERRORDATA = "Error en datos enviados, favor de revisar";
const CONTAINERSNAMES = 'sudo docker ps --format "table {{.ID}}\\t{{.Names}}"';
const LOGS = `sudo docker logs --tail 5 mysql55`;

const TAIL = 'logs --tail';
const CAD_VACIA = '        ';

const IP_SERVER_ERROR = 'Formato incorrecto de la IP, favor de revisar';
const FOUND_SERVER = 'Servidor encontrado con el nombre :';
const SEVER_NOT_FOUND = 'Servidor no encontrado';

module.exports = {
  ERRORDATA,
  CONTAINERSNAMES,
  LOGS,
  TAIL,
  CAD_VACIA,
  IP_SERVER_ERROR,
  FOUND_SERVER,
  SEVER_NOT_FOUND,
};