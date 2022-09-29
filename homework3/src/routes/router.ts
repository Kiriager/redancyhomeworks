import express = require('express')
const router = express.Router()

import noteController = require('../controllers/noteController')

router.get('/', (req, res) => {
  res.json({message: 'hello'})
})

// router.post('/notes', (req, res) => {
//   res.json({message: res})
// })

router.post('/notes', noteController.create)

router.get('/notes', noteController.showAll)
router.get('/notes/stats', noteController.showStats)
router.get('/notes/:id', noteController.showSingle)

router.delete('/notes', noteController.deleteAllInTable)
router.delete('/notes/:id', noteController.deleteSingle)

router.patch('/notes/archive', noteController.setAllArchiveStatus)
router.patch('/notes/archive/:id', noteController.setSingleArchiveStatus)
router.patch('/notes/:id', noteController.edit)





export = router