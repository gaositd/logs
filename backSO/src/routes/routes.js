const { Router } = require('express');
const { getLogDocker } = require('./controller/logController.js');
const { postNewServer } = require('./controller/newServer.js');
const { putUpdateServer } = require('./controller/updateServer.js');
const { deleteServer } = require('./controller/deleteServer.js')
const { getContainersNames } = require('./controller/containersNames.js')
const { 
  findServer ,
  findServerById,
  findServerByName,
} = require('../finders/find.js');

const router = Router();

router.get('/getLogs', getLogDocker);
router.get('/getContainersNames', getContainersNames);
router.post('/newserver', postNewServer);
router.put('/updateServer', putUpdateServer);
router.delete('/deleteServer', deleteServer);
router.get('/find/server', findServer);
router.get('/find/byName', findServerByName);
router.get('/find/:id', findServerById);
module.exports = router;


