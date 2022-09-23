const dotenv = require('dotenv')
dotenv.config()

function start() {
  const app = require('./App')
  app.listen(process.env.PORT)
}

start()