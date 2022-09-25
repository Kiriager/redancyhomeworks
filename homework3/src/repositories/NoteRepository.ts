import { db } from "../db"
import { NoteData } from "../models/Note"

class NoteRepository {
  constructor() {}
  findAll():NoteData[] {
    return db.notesCollection
  }
  
  insertOne(data: NoteData) {
    data.id = db.idGenerator++
    db.notesCollection.push(data)
  }
}

export = new NoteRepository