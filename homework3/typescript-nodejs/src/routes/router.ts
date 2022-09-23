import express = require("express")
const router = express.Router()

//const controller = require('./controller')

//router.get('/', controller.home)
router.get('/', (req, res) => {
  res.json({message: 'hello'})
})

module.exports = router