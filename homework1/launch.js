const dotenv = require('dotenv')
dotenv.config()

async function start() {
  const app = require('./app')
  app.listen(process.env.PORT)
}

start()