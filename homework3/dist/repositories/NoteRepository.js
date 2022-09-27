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
    insertOne(data) {
        return new Promise((resolve, reject) => {
            data.id = db_1.db.idGenerator++;
            db_1.db.notesCollection.push(data);
            resolve(data);
        });
    }
}
module.exports = new NoteRepository();
//# sourceMappingURL=NoteRepository.js.map