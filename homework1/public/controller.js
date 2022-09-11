import Note from "./Note.js"
import {createCategorySelect, refreshStatsTable, refreshNotesTable} from "./builder.js"

const controller = {}

controller.showCreateForm = function() {
  document.getElementById("create-note-button").hidden = true
  document.getElementById("note-form").hidden = false
  document.getElementById("submit-note-form").classList = "add-note"
}

controller.showEditForm = function (noteId) {
  let note = Note.findById(noteId)
  if (note) {
    document.getElementById("name").value = note.data.name
    document.getElementById("category").value = note.data.category
    document.getElementById("content").value = note.data.content
    
    document.getElementById("note-form").hidden = false
    document.getElementById("create-note-button").hidden = true
    document.getElementById("submit-note-form").classList = "update-note"
  }
}

controller.hideNoteForm = function() {
  document.getElementById("note-form").reset()
  document.getElementById("note-form").hidden = true
  document.getElementById("create-note-button").hidden = false  
}

controller.createNote = function(formData) {
  let note = new Note(formData)
  this.hideNoteForm()
  note.create()
  
  if (!note.errors.length) {
    this.refreshView()
  }
}

controller.refreshView = function() {
  refreshNotesTable(Note.findAll(), Note.getSessionData().archiveTableStatus)
  refreshStatsTable(Note.findAll(), Note.getCategories())
} 

controller.initTables = function() {
  Note.initiateNotesData()
  this.refreshView()
  createCategorySelect(Note.getCategories())
}

controller.deleteNote = function(id) {
  this.interruptEdit()
  this.refreshView()

  if (confirm("Sure?")) {
    let note = Note.findById(id)
    if (note) {
      Note.delete(id)    
      this.refreshView()
    }
  }
}

controller.switchNoteArchived = function(id) {
  let note = Note.findById(id)
  if (note) {
    note.switchNoteArchived()    
    this.refreshView()
  }
}

controller.interruptEdit = function() {
  let editNoteId = Note.getSessionData().editNoteId
  if (editNoteId != -1) {
    document.getElementById(`note${editNoteId}`).hidden = false
    Note.interruptEditNote()
    this.hideNoteForm()
  }
}

controller.initEditSession = function(id) {
  this.interruptEdit()
  let note = Note.findById(id)
  if (note) {
    document.getElementById(`note${id}`).hidden = true
    Note.setEditSession(id)
    this.showEditForm(id)
  }
}
controller.updateNote = function(data) {  
  let note = Note.findById(Note.getSessionData().editNoteId)

  if (note) {
    note.update(data)
  }

  this.interruptEdit()
  this.refreshView()
}

controller.swapTableArchiveStatus = function() {
  this.hideNoteForm()
  this.interruptEdit()
  Note.swapArchiveTableStatus()
  document.getElementById("create-note-button").hidden = Note.getSessionData().archiveTableStatus
  if (Note.getSessionData().archiveTableStatus) {
    document.getElementById("swap-table-status").innerHTML = "Show Active Notes"
  } else {
    document.getElementById("swap-table-status").innerHTML = "Show Archive Notes"
  }
  this.refreshView()
}

controller.discardNoteForm = function() {
  this.hideNoteForm()
  this.interruptEdit()
  this.refreshView()
}

export default controller