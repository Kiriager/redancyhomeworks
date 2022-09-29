import { Category, CategoryStats } from '../models/Category'
import { toDto } from '../helpers/mapper'
import { Note, NoteData, NoteFormData } from '../models/Note'
import noteRpository = require("../repositories/NoteRepository")
import categoryRpository = require("../repositories/CategoryRepository")
import { NoteDto } from '../models/NoteDto';


export let getAllNotes = function (): Promise<NoteDto[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await categoryRpository.findAll()
      let notes = await noteRpository.findAll()
      let dtos = notes.map((note) => {
        let category = categories.find((c) => {return c.id == note.categoryId})
        if (!category) {
          category = { id: -1, categoryName: "Uncategorized", categoryIcon: "" }
        }
        return toDto(note, category)
      })
      resolve(dtos)
    } catch (error) {
      reject(error)
    }
  })
}

export let getNote = function (id: number): Promise<NoteDto> { 
  return new Promise(async (resolve, reject) => {
    try {
      let note = await noteRpository.findOneById(id)
      let category = { id: 0, categoryName: "Uncategorized", categoryIcon: "" }
      await categoryRpository.findOneById(note.categoryId).then((c) => {category = c})
      resolve(toDto(note, category))
    } catch (error) {
      reject(error)
    }
  })
}

export let deleteNote = function (id: number): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await noteRpository.deleteOneById(id)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export let addNote = function (data: NoteFormData): Promise<number> {  
  return new Promise(async (resolve, reject) => {
    try {
      let note = new Note(data)
      await validateNote(note)
      resolve(await noteRpository.insertOne(note))
    } catch (error) {
      reject(error)
    }
  })
}

export let updateNote = function (id:number, data: NoteFormData): Promise<void> {  
  return new Promise(async (resolve, reject) => {
    try {
      let note = await noteRpository.findOneById(id)
      note.title = data.title
      note.content = data.content
      note.categoryId = data.categoryId
      await validateNote(note)
      await noteRpository.findAndUpdate(note)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export let setNoteArchiveStatus = function (id:number, archiveStatus: boolean): Promise<void> {  
  return new Promise(async (resolve, reject) => {
    try {
      let note = await noteRpository.findOneById(id)
      note.archiveStatus = archiveStatus
      await noteRpository.findAndUpdate(note)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export let setAllNotesArchiveStatus = function (archiveStatus: boolean): Promise<void> {
  console.log("service " + archiveStatus);
   
  return new Promise(async (resolve, reject) => {
    try {     
      let notes = await noteRpository.findAll()
      notes = notes.map((note) => {
        note.archiveStatus = archiveStatus
        return note
      })
      console.log(notes);
      
      await noteRpository.updateAll(notes)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export let deleteAllNotesWithStatus = function(archiveStatus: boolean): Promise<void> { 
  return new Promise(async (resolve, reject) => {
    try {
      await noteRpository.deleteAllByStatus(archiveStatus)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export let getCategoriesStats = function():Promise<CategoryStats[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await categoryRpository.findAll()
      let notes = await noteRpository.findAll()
      let stats = categories.map((c) => {
        return getCategoryStats(notes, c)
      })      
      resolve(stats)
    } catch (error) {
      reject(error)
    }
  })
}

let validateNote = async function (data: NoteData): Promise<void> {
  return new Promise((resolve, reject) => {
    let errors = new Array<string>
    if (data.title === "") {
      errors.push("Note title is required.")
    }
    if (data.content === "") {
      errors.push("Note content is required.")
    }
    categoryRpository.findOneById(data.categoryId).then(() => {
      if (!errors.length) {
        resolve()
      } else {
        reject(errors)
      }
    }).catch((error) => {
      errors.push(error)
      reject(errors)
    })
  })
}

function getCategoryStats(notes: NoteData[], category: Category):CategoryStats {
  let categoryStats = { category: category, active: 0, archived: 0 }
  notes.forEach(note => {
    if (note.categoryId === category.id) {
      if (note.archiveStatus) {
        categoryStats.archived++
      } else {
        categoryStats.active++
      }
    }
  })
  return categoryStats
}