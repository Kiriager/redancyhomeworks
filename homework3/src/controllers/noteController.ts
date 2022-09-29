import express = require('express')
import noteService = require('../services/noteService')

export let showAll = async function(req: express.Request, res:express.Response) {
  res.append('Content-Type', 'application/json')
  try {
    res.status(200).send(JSON.stringify({notes: await noteService.getAllNotes()}))
  } catch (error) {
    res.status(500).send(JSON.stringify({error: error}))
  }
}

export let showSingle = async function(req: express.Request, res: express.Response) {
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

export let deleteSingle = async function(req: express.Request, res: express.Response) {
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

export let create = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try { 
    res.location("/notes/:" + await noteService.addNote(req.body))
    res.status(201).send(JSON.stringify({message: "Note has been created."}))
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}

export let edit = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try { 
    await noteService.updateNote(parseInt(req.params.id), req.body)
    res.status(204).send()
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}

export let setSingleArchiveStatus = async function(req: express.Request, res: express.Response) { 
  res.append('Content-Type', 'application/json')
  try {
    if (typeof(req.body.archiveStatus) != "boolean") {
      res.status(400).send(JSON.stringify({error: "Invalid request body."}))
    } else {
      await noteService.setNoteArchiveStatus(parseInt(req.params.id), req.body.archiveStatus)
      res.status(204).send()
    }
  } catch (error) {
    if (error === "404") {
      res.status(404).send(JSON.stringify({message: "Note doesn't exist."}))
    } else {
      res.status(500).send(JSON.stringify({error: error}))
    }
  }
}

export let setAllArchiveStatus = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json') 
  try {
    if (typeof(req.body.archiveStatus) != "boolean") {
      res.status(400).send(JSON.stringify({error: "Invalid request body."}))
    } else {
      await noteService.setAllNotesArchiveStatus(req.body.archiveStatus)
      res.status(204).send()
    }
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}

export let deleteAllInTable = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try {
    if (req.query.status != "true" && req.query.status != "false") {
      res.status(400).send(JSON.stringify({error: "Invalid guery."}))
    } else {
      await noteService.deleteAllNotesWithStatus(req.query.status === "true")
      res.status(204).send()
    }
  } catch (errors) {
    res.status(400).send(JSON.stringify({errors}))
  }
}

export let showStats = async function(req: express.Request, res: express.Response) {
  res.append('Content-Type', 'application/json')
  try { 
    res.status(200).send(JSON.stringify(await noteService.getCategoriesStats()))
  } catch (errors) {
    res.status(500).send(JSON.stringify({ errors }))
  }
}

