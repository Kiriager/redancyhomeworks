import express = require('express')
const router = express.Router()

import noteController = require('../controllers/noteController')

router.get('/', (req, res) => {
  res.json({message: 'hello'})
})

// router.post('/notes', (req, res) => {
//   res.json({message: res})
// })

router.post('/notes', noteController.createNote)
router.get('/notes', noteController.showAllNotes)
router.get('/notes/:id', noteController.showSingleNote)
router.delete('/notes/:id', noteController.deleteSingleNote)

export = router