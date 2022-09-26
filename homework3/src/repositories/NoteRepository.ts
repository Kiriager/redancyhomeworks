import { db } from "../db"
import { Category } from "../models/Category"
import { Note, NoteData } from "../models/Note"

class NoteRepository {
  constructor() {}
  findAll():Promise<NoteData[]> {
    return new Promise((resolve, reject) => {
      resolve(db.notesCollection)
    })
  }
  
  insertOne(data: NoteData) {
    data.id = db.idGenerator++
    db.notesCollection.push(data)
  }
}

function toDto(note: Note, category: Category) {
  return {
    id: note.data.id,
    title: note.data.title,
    createDate: note.data.createDate,
    archiveStatus: note.data.archiveStatus,
    content: note.data.content,
    category: category
  }
}

export = new NoteRepository()