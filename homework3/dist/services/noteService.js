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
exports.getCategoriesStats = exports.deleteAllNotesWithStatus = exports.setAllNotesArchiveStatus = exports.setNoteArchiveStatus = exports.updateNote = exports.addNote = exports.deleteNote = exports.getNote = exports.getAllNotes = void 0;
const mapper_1 = require("../helpers/mapper");
const Note_1 = require("../models/Note");
const noteRpository = require("../repositories/NoteRepository");
const categoryRpository = require("../repositories/CategoryRepository");
let getAllNotes = function () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let categories = yield categoryRpository.findAll();
            let notes = yield noteRpository.findAll();
            let dtos = notes.map((note) => {
                let category = categories.find((c) => { return c.id == note.categoryId; });
                if (!category) {
                    category = { id: -1, categoryName: "Uncategorized", categoryIcon: "" };
                }
                return (0, mapper_1.toDto)(note, category);
            });
            resolve(dtos);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.getAllNotes = getAllNotes;
let getNote = function (id) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let note = yield noteRpository.findOneById(id);
            let category = { id: 0, categoryName: "Uncategorized", categoryIcon: "" };
            yield categoryRpository.findOneById(note.categoryId).then((c) => { category = c; });
            resolve((0, mapper_1.toDto)(note, category));
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.getNote = getNote;
let deleteNote = function (id) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield noteRpository.deleteOneById(id);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.deleteNote = deleteNote;
let addNote = function (data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let note = new Note_1.Note(data);
            yield validateNote(note);
            resolve(yield noteRpository.insertOne(note));
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.addNote = addNote;
let updateNote = function (id, data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let note = yield noteRpository.findOneById(id);
            note.title = data.title;
            note.content = data.content;
            note.categoryId = data.categoryId;
            yield validateNote(note);
            yield noteRpository.findAndUpdate(note);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.updateNote = updateNote;
let setNoteArchiveStatus = function (id, archiveStatus) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let note = yield noteRpository.findOneById(id);
            note.archiveStatus = archiveStatus;
            yield noteRpository.findAndUpdate(note);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.setNoteArchiveStatus = setNoteArchiveStatus;
let setAllNotesArchiveStatus = function (archiveStatus) {
    console.log("service " + archiveStatus);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let notes = yield noteRpository.findAll();
            notes = notes.map((note) => {
                note.archiveStatus = archiveStatus;
                return note;
            });
            console.log(notes);
            yield noteRpository.updateAll(notes);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.setAllNotesArchiveStatus = setAllNotesArchiveStatus;
let deleteAllNotesWithStatus = function (archiveStatus) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield noteRpository.deleteAllByStatus(archiveStatus);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.deleteAllNotesWithStatus = deleteAllNotesWithStatus;
let getCategoriesStats = function () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let categories = yield categoryRpository.findAll();
            let notes = yield noteRpository.findAll();
            let stats = categories.map((c) => {
                return getCategoryStats(notes, c);
            });
            resolve(stats);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.getCategoriesStats = getCategoriesStats;
let validateNote = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let errors = new Array;
            if (data.title === "") {
                errors.push("Note title is required.");
            }
            if (data.content === "") {
                errors.push("Note content is required.");
            }
            categoryRpository.findOneById(data.categoryId).then(() => {
                if (!errors.length) {
                    resolve();
                }
                else {
                    reject(errors);
                }
            }).catch((error) => {
                errors.push(error);
                reject(errors);
            });
        });
    });
};
function getCategoryStats(notes, category) {
    let categoryStats = { category: category, active: 0, archived: 0 };
    notes.forEach(note => {
        if (note.categoryId === category.id) {
            if (note.archiveStatus) {
                categoryStats.archived++;
            }
            else {
                categoryStats.active++;
            }
        }
    });
    return categoryStats;
}
//# sourceMappingURL=noteService.js.map