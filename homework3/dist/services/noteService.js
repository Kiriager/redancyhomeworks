"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const Note_1 = require("../models/Note");
//const Note = require("../models/Note")
let getAll = function (req, res) {
    let notes = Note_1.Note.showAll();
    res.json({ notes: notes });
    //res.json({message: "notes should be here"})
};
exports.getAll = getAll;
//# sourceMappingURL=noteService.js.map