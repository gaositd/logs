const ERRORDATA = "Error en datos enviados, favor de revisar";
const CONTAINERSNAMES = 'sudo docker ps --format "table {{.ID}}\\t{{.Names}}';
const LOGS = `sudo docker logs --tail 5 mysql55 --format "table {{.ID}}\\t{{.Names}}\\t{{.RunningFor}}\\t{{.Status}}\\t{{.Ports}}"`;//'sudo docker logs --tail 5 mysql55';

module.exports = {
  ERRORDATA,
  CONTAINERSNAMES,
  LOGS
};