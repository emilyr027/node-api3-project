// require your server and start it
require('dotenv').config()
const server = require('./api/server');

const PORT = process.env.PORT || 5000

console.log(process.env.NODE_ENV)

server.listen(PORT, () => {
    console.log(`\n* Server Running on port ${PORT} *\n`);
})