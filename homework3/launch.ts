const dotenv = require('dotenv')
dotenv.config()

function start() {
  const app = require('./app')
  app.listen(process.env.PORT)
}

start()