import express = require('express')
const router = express.Router()

import noteService = require('../services/noteService')

//router.get('/', controller.home)
router.get('/', (req, res) => {
  res.json({message: 'hello'})
})

router.get('/notes', noteService.getAll)

export = router