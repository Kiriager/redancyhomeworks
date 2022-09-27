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
exports.Note = void 0;
const noteRpository = require("../repositories/NoteRepository");
class Note {
    constructor(data) {
        this.errors = [];
        this.data = {
            id: -1,
            title: data.title,
            createDate: new Date(),
            content: data.content,
            archiveStatus: false,
            categoryId: data.categoryId
        };
    }
    static showAll() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let notes = yield noteRpository.findAll();
                resolve(notes);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    static showSinleNote(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let note = yield noteRpository.findOneById(id);
                resolve(note);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    create() {
        return new Promise((resolve, reject) => {
            this.cleanUp();
            this.validate();
            if (!this.errors.length) {
                resolve();
                // noteRpository.insertOne(this.data).then(() => {
                //   resolve()
                // }).catch(() => {
                //   this.errors.push("please try again later")
                //   reject(this.errors)
                // })
            }
            else {
                reject(this.errors);
            }
        });
    }
    cleanUp() {
        this.data.title = this.data.title.trim();
        this.data.content = this.data.content.trim();
    }
    validate() {
        let errors = [];
        if (this.data.title === "") {
            errors.push("Note title is required.");
        }
        // if (note.category.categoryName === "") {
        //   errors.push("Note category is required.")
        // }
        // let category = categories.find((category) => {
        //   return note.category.categoryName === category.categoryName
        // })
        // if (!category) {
        //   errors.push("Category has to be one of the list.")
        // } else {
        //   note.category = category
        // }
        if (this.data.content === "") {
            errors.push("Note content is required.");
        }
        return errors;
    }
}
exports.Note = Note;
//# sourceMappingURL=Note.js.map