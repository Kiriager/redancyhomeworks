import express = require('express')
const router = express.Router()

import noteController = require('../controllers/noteController')

//router.get('/', controller.home)
router.get('/', (req, res) => {
  res.json({message: 'hello'})
})

// router.get('/notes/:id', (req, res) => {
//   res.json({message: 'hello width param'})
// })

router.get('/notes', noteController.showAllNotes)
router.get('/notes/:id', noteController.showSingleNote)
//router.delete('/notes/:id', noteController.deleteNote)

export = router