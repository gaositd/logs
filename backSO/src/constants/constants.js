const ERRORDATA = "Error en datos enviados, favor de revisar";
const CONTAINERSNAMES = 'sudo docker ps --format "table {{.ID}}\\t{{.Names}}"';
const LOGS = `sudo docker logs --tail 5 mysql55`;

const CONTAINER_ID = '        ';
const TAIL = 'logs --tail';

module.exports = {
  ERRORDATA,
  CONTAINERSNAMES,
  LOGS,
  CONTAINER_ID,
  TAIL,
};