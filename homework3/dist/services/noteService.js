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
exports.addNote = exports.deleteNote = exports.getNote = exports.getAllNotes = void 0;
const mapper_1 = require("../helpers/mapper");
const Note_1 = require("../models/Note");
const noteRpository = require("../repositories/NoteRepository");
const categoryRpository = require("../repositories/CategoryRepository");
//const Note = require("../models/Note")
let getAllNotes = function () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let categories = yield categoryRpository.findAll();
            let notes = yield noteRpository.findAll();
            let dtos = notes.map((note) => {
                let category = categories.find((c) => { return c.id == note.categoryId; });
                if (!category) {
                    category = { id: 0, categoryName: "Uncategorized", categoryIcon: "" };
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
        let note = new Note_1.Note(data);
        try {
            yield validateNote(note);
            resolve(yield noteRpository.insertOne(note));
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.addNote = addNote;
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
            categoryRpository.findOneById(data.categoryId).then().catch((error) => {
                errors.push(error);
            });
            if (!errors.length) {
                resolve();
            }
            else {
                reject(errors);
            }
        });
    });
};
// function toDto(note: Note):NoteDto {
//   let category = Category.findAll()
//   return {
//     id: note.data.id,
//     title: note.data.title,
//     createDate: note.data.createDate,
//     archiveStatus: note.data.archiveStatus,
//     content: note.data.content,
//     category: category
//   }
// }
// try {
//   let note = await Note.showSingleNote(parseInt(req.params.id))
//   let category = await Category.findOneById(5)
//   //let category = await Category.findOneById(note.categoryId)
//   // let dtos = notes.map((note) => {
//   //   let category = categories[note.categoryId + 1]
//   //   return toDto(note, category)
//   // })
//   res.append('Content-Type', 'application/json')
//   res.status(200).send(JSON.stringify({ note: toDto(note, category) }))
// } catch (error) {
//   res.append('Content-Type', 'application/json')
//   if (error === "404") {
//     res.status(404).send(JSON.stringify({ message: "Note doesn't exist." }))
//   } else {
//     res.status(500).send(JSON.stringify({ error: error }))
//   }
// }
//# sourceMappingURL=noteService.js.map