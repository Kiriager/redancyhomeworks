import express = require('express')
import Category = require('../models/Category')
import { toDto } from '../helpers/mapper';
import { Note } from '../models/Note';
//const Note = require("../models/Note")

export let getAll = async function(req: express.Request, res:express.Response) {
  try {
    let categories = await Category.findAll()
    let notes = await Note.showAll()
    let dtos = notes.map((note) => {
      let category = categories[note.categoryId]
      return toDto(note, category)
    })
    res.json(dtos)
  } catch (error) {
    res.json({error: error})
  }
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
