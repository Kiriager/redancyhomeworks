import express = require('express')
import Category = require('../models/Category')
import { toDto } from '../helpers/mapper';
import { Note } from '../models/Note';
import noteService = require('../services/noteService')


//const Note = require("../models/Note")

export let showAllNotes = async function(req: express.Request, res:express.Response) {
  try {
    let notes = await noteService.getAllNotes()
    res.append('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify({notes: notes}))
  } catch (error) {
    res.append('Content-Type', 'application/json')
    res.status(500).send(JSON.stringify({error: error}))
  }
}

export let showSingleNote = async function(req: express.Request, res: express.Response) {
  try {
    let note = await noteService.getNote(parseInt(req.params.id))
    res.append('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify({note}))
  } catch (error) {
    res.append('Content-Type', 'application/json')
    if (error === "404") {
      res.status(404).send(JSON.stringify({message: "Note doesn't exist."}))
    } else {
      res.status(500).send(JSON.stringify({error: error}))
    }
  }
}

export let deleteSingleNote = async function(req: express.Request, res: express.Response) {
  try {
    await noteService.deleteNote(parseInt(req.params.id))
    res.append('Content-Type', 'application/json')
    res.status(204).send()
  } catch (error) {
    res.append('Content-Type', 'application/json')
    if (error === "404") {
      res.status(404).send(JSON.stringify({message: "Note doesn't exist."}))
    } else {
      res.status(500).send(JSON.stringify({error: error}))
    }
  }
}

export let createNote = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try {
    await noteService.addNote(req.body)
    res.status(204).send()
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}