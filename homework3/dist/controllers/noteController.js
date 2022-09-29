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
exports.showStats = exports.deleteAllInTable = exports.setAllArchiveStatus = exports.setSingleArchiveStatus = exports.edit = exports.create = exports.deleteSingle = exports.showSingle = exports.showAll = void 0;
const noteService = require("../services/noteService");
let showAll = function (req, res) {
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
exports.showAll = showAll;
let showSingle = function (req, res) {
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
exports.showSingle = showSingle;
let deleteSingle = function (req, res) {
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
exports.deleteSingle = deleteSingle;
let create = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.append('Content-Type', 'application/json');
        try {
            res.location("/notes/:" + (yield noteService.addNote(req.body)));
            res.status(201).send(JSON.stringify({ message: "Note has been created." }));
        }
        catch (errors) {
            res.status(400).send(JSON.stringify({ errors }));
        }
    });
};
exports.create = create;
let edit = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.append('Content-Type', 'application/json');
        try {
            yield noteService.updateNote(parseInt(req.params.id), req.body);
            res.status(204).send();
        }
        catch (errors) {
            res.status(400).send(JSON.stringify({ errors }));
        }
    });
};
exports.edit = edit;
let setSingleArchiveStatus = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.append('Content-Type', 'application/json');
        try {
            yield noteService.setNoteArchiveStatus(parseInt(req.params.id), req.body.archiveStatus);
            res.status(204).send();
        }
        catch (errors) {
            res.status(400).send(JSON.stringify({ errors }));
        }
    });
};
exports.setSingleArchiveStatus = setSingleArchiveStatus;
let setAllArchiveStatus = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.append('Content-Type', 'application/json');
        try {
            yield noteService.setAllNotesArchiveStatus(req.body.archiveStatus);
            res.status(204).send();
        }
        catch (errors) {
            res.status(400).send(JSON.stringify({ errors }));
        }
    });
};
exports.setAllArchiveStatus = setAllArchiveStatus;
let deleteAllInTable = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.append('Content-Type', 'application/json');
        try {
            if (req.query.status != "true" && req.query.status != "false") {
                res.status(400).send(JSON.stringify({ error: "Invalid guery." }));
            }
            else {
                yield noteService.deleteAllNotesWithStatus(req.query.status === "true");
                res.status(204).send();
            }
        }
        catch (errors) {
            res.status(400).send(JSON.stringify({ errors }));
        }
    });
};
exports.deleteAllInTable = deleteAllInTable;
let showStats = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.append('Content-Type', 'application/json');
        try {
            res.status(200).send(JSON.stringify(yield noteService.getCategoriesStats()));
        }
        catch (errors) {
            res.status(400).send(JSON.stringify({ errors }));
        }
    });
};
exports.showStats = showStats;
//# sourceMappingURL=noteController.js.map