const { Router } = require('express');
const { getLogDocker } = require('./controller/logController.js');
const { postNewServer } = require('./controller/newServer.js');
const { putUpdateServer } = require('./controller/updateServer.js');
const { deleteServer } = require('./controller/deleteServer.js')
const { getContainersNames } = require('./controller/containersNames.js')

const router = Router();

router.get('/getLogs', getLogDocker);
router.get('/getContainersNames', getContainersNames);
router.post('/newserver', postNewServer);
router.put('/updateServer', putUpdateServer);
router.delete('/deleteServer', deleteServer);
module.exports = router;


