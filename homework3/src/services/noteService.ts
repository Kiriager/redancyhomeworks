import express = require('express')
import Category = require('../models/Category')
import { toDto } from '../helpers/mapper';
import { Note, NoteData, NoteFormData } from '../models/Note';
import noteRpository = require("../repositories/NoteRepository")
import categoryRpository = require("../repositories/CategoryRepository")
import { NoteDto } from '../models/NoteDto';
//const Note = require("../models/Note")

export let getAllNotes = function (): Promise<NoteDto[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await categoryRpository.findAll()
      let notes = await noteRpository.findAll()
      let dtos = notes.map((note) => {
        let category = categories.find((c) => {return c.id == note.categoryId})
        if (!category) {
          category = { id: 0, categoryName: "Uncategorized", categoryIcon: "" }
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
    let note = new Note(data)
    try {
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
  return new Promise(async (resolve, reject) => {
    try {     
      let notes = await noteRpository.findAll()
      notes.map((note) => {note.archiveStatus = archiveStatus})
      await noteRpository.updateAll(notes)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export let deleteAllNotesWithStatus = function (archiveStatus: boolean): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await noteRpository.deleteAllByStatus(archiveStatus)
      resolve()
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
    categoryRpository.findOneById(data.categoryId).then().catch((error) => { 
      errors.push(error) 
    })
    if (!errors.length) {
      resolve()
    } else {
      reject(errors)
    }
  })
}

