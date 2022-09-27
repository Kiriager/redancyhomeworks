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

  insertOne(data: NoteData): Promise<number> {
    return new Promise((resolve, reject) => {
      data.id = db.idGenerator++
      db.notesCollection.push(data)
      resolve(data.id)
    }) 
  }

  findAndUpdate(data: NoteData): Promise<void> {
    return new Promise((resolve, reject) => {
      let noteIndex = db.notesCollection.findIndex((note) => {
        return note.id === data.id
      })
      if (noteIndex >= 0) {
        db.notesCollection[noteIndex] = data
        resolve()
      } else {
        reject("404")
      }
    }) 
  }

  updateAll(notes: NoteData[]): Promise<void> {
    return new Promise((resolve, reject) => {
      db.notesCollection = notes
      resolve()
    })
  }
}

export = new NoteRepository()