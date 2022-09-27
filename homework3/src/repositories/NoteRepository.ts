import { db } from "../db"
import { Category } from "../models/Category"
import { Note, NoteData } from "../models/Note"

class NoteRepository {
  constructor() { }
  findAll(): Promise<NoteData[]> {
    return new Promise((resolve, reject) => {
      resolve(db.notesCollection)
    })
  }

  findOneById(id: number): Promise<NoteData> {
    return new Promise((resolve, reject) => {
      let note = db.notesCollection.find((n) => {
        return n.id == id
      })
      if (note) {
        resolve(note)
      } else {
        reject("404")
      }
    })
  }

  deleteOneById(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let noteIndex = db.notesCollection.findIndex((n) => {
        return n.id == id
      })
      if (noteIndex >= 0) {
        db.notesCollection.splice(noteIndex, 1)
        resolve()
      } else {
        reject("404")
      }
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