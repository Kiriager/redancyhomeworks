"use strict";
const db_1 = require("../db");
class NoteRepository {
    constructor() { }
    findAll() {
        return new Promise((resolve, reject) => {
            resolve(db_1.db.notesCollection);
        });
    }
    findOneById(id) {
        return new Promise((resolve, reject) => {
            let note = db_1.db.notesCollection.find((n) => {
                return n.id == id;
            });
            if (note) {
                resolve(note);
            }
            else {
                reject("404");
            }
        });
    }
    deleteOneById(id) {
        return new Promise((resolve, reject) => {
            let noteIndex = db_1.db.notesCollection.findIndex((n) => {
                return n.id == id;
            });
            if (noteIndex >= 0) {
                db_1.db.notesCollection.splice(noteIndex, 1);
                resolve();
            }
            else {
                reject("404");
            }
        });
    }
    deleteAllByStatus(archiveStatus) {
        return new Promise((resolve, reject) => {
            let newList = db_1.db.notesCollection.filter((n) => {
                return n.archiveStatus != archiveStatus;
            });
            if (!newList.length) {
                db_1.db.notesCollection = new Array;
            }
            else {
                db_1.db.notesCollection = newList;
            }
            resolve();
        });
    }
    insertOne(data) {
        return new Promise((resolve, reject) => {
            data.id = db_1.db.idGenerator++;
            db_1.db.notesCollection.push(data);
            resolve(data.id);
        });
    }
    findAndUpdate(data) {
        return new Promise((resolve, reject) => {
            let noteIndex = db_1.db.notesCollection.findIndex((note) => {
                return note.id === data.id;
            });
            if (noteIndex >= 0) {
                db_1.db.notesCollection[noteIndex] = data;
                resolve();
            }
            else {
                reject("404");
            }
        });
    }
    updateAll(notes) {
        return new Promise((resolve, reject) => {
            db_1.db.notesCollection = notes;
            resolve();
        });
    }
}
module.exports = new NoteRepository();
//# sourceMappingURL=NoteRepository.js.map