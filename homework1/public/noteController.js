import Note from "./Note.js"
import Session from "./Session.js"
import builder from "./builder.js"

const noteController = {}

noteController.deleteNote = function(id) {
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

noteController.interruptEdit = function() {
  let id = Session.getData().editNoteId
  if (id != -1) {
    builder.viewNote(id)
    Session.interruptEditNote()
    builder.hideNoteForm()
  }
}

noteController.switchArchiveStatus = function() {
  Session.switchArchiveStatus()
  this.interruptEdit()
  
  builder.hideNoteForm()
  builder.switchArchiveElements(Session.getData().archiveTableStatus)

  this.refreshView()
}

noteController.createNote = function(formData) {
  let note = new Note(formData)
  note.create()

  builder.hideNoteForm()//errs view

  if (!note.errors.length) {
    this.refreshView()
  }
}

noteController.switchNoteArchived = function(id) {
  let note = Note.findById(id)
  if (note) {
    note.switchNoteArchived()    
    this.refreshView()
  }
}

noteController.initEditSession = function(id) {
  this.interruptEdit()
  let note = Note.findById(id)
  if (note) {
    Session.setEditSession(id)
    builder.hideNote(id)
    builder.viewEditForm(note)
  }
}

noteController.updateNote = function(data) {  
  let note = Note.findById(Session.getData().editNoteId)
  if (note) {
    note.update(data)
  }
  this.interruptEdit()
  this.refreshView()
}

noteController.discardNoteForm = function() {
  builder.hideNoteForm()
  this.interruptEdit()
  this.refreshView()
}

noteController.refreshView = function() {
  builder.refreshNotesTable(Note.findAll(), Session.getData().archiveTableStatus)
  builder.refreshStatsTable(Note.findAll(), Note.getCategories())
} 

noteController.showCreateForm = function() {
  builder.viewCreateForm()
}

noteController.hideNoteForm = function() {
  builder.hideNoteForm()  
}

noteController.initTables = function() {
  Note.initiateNotesData()
  this.refreshView()
  builder.createCategorySelect(Note.getCategories())
}

export default noteController