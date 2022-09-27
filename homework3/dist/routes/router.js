"use strict";
const express = require("express");
const router = express.Router();
const noteService = require("../services/noteService");
//router.get('/', controller.home)
router.get('/', (req, res) => {
    res.json({ message: 'hello' });
});
// router.get('/notes/:id', (req, res) => {
//   res.json({message: 'hello width param'})
// })
router.get('/notes', noteService.getAll);
router.get('/notes/:id', noteService.getNote);
module.exports = router;
//# sourceMappingURL=router.js.map