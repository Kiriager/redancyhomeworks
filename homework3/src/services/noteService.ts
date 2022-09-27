import express = require('express')
import Category = require('../models/Category')
import { toDto } from '../helpers/mapper';
import { Note } from '../models/Note';
import noteRpository = require("../repositories/NoteRepository")
import categoryRpository = require("../repositories/CategoryRepository")
import { NoteDto } from '../models/NoteDto';
//const Note = require("../models/Note")

export let getAllNotes = async function (): Promise<NoteDto[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await categoryRpository.findAll()
      let notes = await noteRpository.findAll()
      let dtos = notes.map((note) => {
        let category = categories[note.categoryId + 1]
        return toDto(note, category)
      })
      resolve(dtos)
    } catch (error) {
      reject(error)
    }
  })
}

export let getNote = async function (id: number): Promise<NoteDto> {
  return new Promise(async (resolve, reject) => {
    try {
      let note = await noteRpository.findOneById(id)
      let category = await categoryRpository.findOneById(note.categoryId)
      resolve(toDto(note, category))
    } catch (error) {
      reject(error)
    }
  })
}


export let deleteNote = async function(id: number):Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await noteRpository.deleteOneById(id)
      resolve() 
    } catch (error) {
      reject(error)
    }
  })
}

// function toDto(note: Note):NoteDto {
//   let category = Category.findAll()

//   return {
//     id: note.data.id,
//     title: note.data.title,
//     createDate: note.data.createDate,
//     archiveStatus: note.data.archiveStatus,
//     content: note.data.content,
//     category: category
//   }
// }


// try {
//   let note = await Note.showSingleNote(parseInt(req.params.id))
//   let category = await Category.findOneById(5)
//   //let category = await Category.findOneById(note.categoryId)

//   // let dtos = notes.map((note) => {
//   //   let category = categories[note.categoryId + 1]
//   //   return toDto(note, category)
//   // })
//   res.append('Content-Type', 'application/json')
//   res.status(200).send(JSON.stringify({ note: toDto(note, category) }))
// } catch (error) {
//   res.append('Content-Type', 'application/json')
//   if (error === "404") {
//     res.status(404).send(JSON.stringify({ message: "Note doesn't exist." }))
//   } else {
//     res.status(500).send(JSON.stringify({ error: error }))
//   }
// }