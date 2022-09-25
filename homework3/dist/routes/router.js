"use strict";
const express = require("express");
const router = express.Router();
const noteService = require("../services/noteService");
//router.get('/', controller.home)
router.get('/', (req, res) => {
    res.json({ message: 'hello' });
});
router.get('/notes', noteService.getAll);
module.exports = router;
//# sourceMappingURL=router.js.map