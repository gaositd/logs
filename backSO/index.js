const dotenv = require('dotenv');
const logServer = require('./src/app.js');

dotenv.config();

const BarkServer = process.env.BACKSERVER || 4321;

logServer.listen(BarkServer, async() => {
  console.log(`listening on port ${BarkServer} over ${process.env.SERVERNAME}`);
});