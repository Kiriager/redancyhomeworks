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
exports.getAll = void 0;
const Category = require("../models/Category");
const mapper_1 = require("../helpers/mapper");
const Note_1 = require("../models/Note");
//const Note = require("../models/Note")
let getAll = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let categories = yield Category.findAll();
            let notes = yield Note_1.Note.showAll();
            let dtos = notes.map((note) => {
                let category = categories[note.categoryId];
                return (0, mapper_1.toDto)(note, category);
            });
            res.json(dtos);
        }
        catch (error) {
            res.json({ error: error });
        }
        //res.json({message: "notes should be here"})
    });
};
exports.getAll = getAll;
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
//# sourceMappingURL=noteService.js.map