"use strict";
const db_1 = require("../db");
class NoteRepository {
    constructor() { }
    findAll() {
        return new Promise((resolve, reject) => {
            resolve(db_1.db.notesCollection);
        });
    }
    insertOne(data) {
        data.id = db_1.db.idGenerator++;
        db_1.db.notesCollection.push(data);
    }
}
function toDto(note, category) {
    return {
        id: note.data.id,
        title: note.data.title,
        createDate: note.data.createDate,
        archiveStatus: note.data.archiveStatus,
        content: note.data.content,
        category: category
    };
}
module.exports = new NoteRepository();
//# sourceMappingURL=NoteRepository.js.map