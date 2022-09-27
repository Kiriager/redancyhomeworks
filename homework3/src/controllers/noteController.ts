import express = require('express')
import Category = require('../models/Category')
import { toDto } from '../helpers/mapper';
import { Note } from '../models/Note';
import noteService = require('../services/noteService')

export let showAllNotes = async function(req: express.Request, res:express.Response) {
  res.append('Content-Type', 'application/json')
  try {
    res.status(200).send(JSON.stringify({notes: await noteService.getAllNotes()}))
  } catch (error) {
    res.status(500).send(JSON.stringify({error: error}))
  }
}

export let showSingleNote = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try {
    res.status(200).send(JSON.stringify({note: await noteService.getNote(parseInt(req.params.id))}))
  } catch (error) {
    if (error === "404") {
      res.status(404).send(JSON.stringify({message: "Note doesn't exist."}))
    } else {
      res.status(500).send(JSON.stringify({error: error}))
    }
  }
}

export let deleteSingleNote = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try {
    await noteService.deleteNote(parseInt(req.params.id))
    res.status(204).send("Note has been deleted.")
  } catch (error) {
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
    res.location("/notes/:" + await noteService.addNote(req.body))
    res.status(201).send("Note has been created.")
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}

export let editNote = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try { 
    await noteService.updateNote(parseInt(req.params.id), req.body)
    res.status(204).send()
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}

export let setSingleNoteArchiveStatus = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try { 
    await noteService.setNoteArchiveStatus(parseInt(req.params.id), req.body)
    res.status(204).send()
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}

export let setAllNotesArchiveStatus = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try { 
    await noteService.setAllNotesArchiveStatus(req.body)
    res.status(204).send()
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}

export let deleteAllNotes = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try { 
    await noteService.deleteAllNotesWithStatus(req.body)
    res.status(204).send()
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}

export let showStats = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try { 
    res.status(200).send(JSON.stringify(await noteService.getCategoriesStats()))
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}

