"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = exports.deleteSingleNote = exports.showSingleNote = exports.showAllNotes = void 0;
const noteService = require("../services/noteService");
//const Note = require("../models/Note")
let showAllNotes = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.append('Content-Type', 'application/json');
        try {
            res.status(200).send(JSON.stringify({ notes: yield noteService.getAllNotes() }));
        }
        catch (error) {
            res.status(500).send(JSON.stringify({ error: error }));
        }
    });
};
exports.showAllNotes = showAllNotes;
let showSingleNote = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.append('Content-Type', 'application/json');
        try {
            res.status(200).send(JSON.stringify({ note: yield noteService.getNote(parseInt(req.params.id)) }));
        }
        catch (error) {
            if (error === "404") {
                res.status(404).send(JSON.stringify({ message: "Note doesn't exist." }));
            }
            else {
                res.status(500).send(JSON.stringify({ error: error }));
            }
        }
    });
};
exports.showSingleNote = showSingleNote;
let deleteSingleNote = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.append('Content-Type', 'application/json');
        try {
            yield noteService.deleteNote(parseInt(req.params.id));
            res.status(204).send("Note has been deleted.");
        }
        catch (error) {
            if (error === "404") {
                res.status(404).send(JSON.stringify({ message: "Note doesn't exist." }));
            }
            else {
                res.status(500).send(JSON.stringify({ error: error }));
            }
        }
    });
};
exports.deleteSingleNote = deleteSingleNote;
let createNote = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.append('Content-Type', 'application/json');
        try {
            let noteId = yield noteService.addNote(req.body);
            res.location("/notes/:" + noteId);
            res.status(201).send("Note has been created.");
        }
        catch (errors) {
            res.status(400).send(JSON.stringify({ errors }));
        }
    });
};
exports.createNote = createNote;
//# sourceMappingURL=noteController.js.map