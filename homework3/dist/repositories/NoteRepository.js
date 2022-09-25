"use strict";
const db_1 = require("../db");
class NoteRepository {
    constructor() { }
    findAll() {
        return db_1.db.notesCollection;
    }
    insertOne(data) {
        data.id = db_1.db.idGenerator++;
        db_1.db.notesCollection.push(data);
    }
}
module.exports = new NoteRepository;
//# sourceMappingURL=NoteRepository.js.map