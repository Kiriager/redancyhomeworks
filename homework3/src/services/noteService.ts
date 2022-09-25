import * as express from 'express';
import { Note } from '../models/Note';
//const Note = require("../models/Note")

export let getAll = function(req: express.Request, res:express.Response) {
  let notes = Note.showAll()
  res.json({notes: notes})
  //res.json({message: "notes should be here"})
}