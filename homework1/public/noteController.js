import Note from "./Note.js"
import Session from "./Session.js"
import builder from "./builder.js"

const noteController = {}

noteController.deleteAllInTable = function() {
  Note.deleteAllInTable()
  this.refreshView()
}

noteController.switchAllArchived = function() {
  Note.switchAllArchived()
  this.refreshView()
}

noteController.deleteNote = function(id) {
  if (confirm("Sure?")) {
    let note = Note.findById(id)
    if (note) {
      Note.delete(id)    
      this.refreshView()
    }
  }
}

noteController.interruptEdit = function() {
  if (Session.getData().editNoteId != -1) {
    Session.interruptEditNote()
  }
  this.refreshView()
  builder.hideNoteForm()
}

noteController.switchArchiveStatus = function() {
  Session.switchArchiveStatus()
  builder.hideNoteForm()
  builder.switchArchiveElements(Session.getData().archiveTableStatus)
  this.interruptEdit()
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
    builder.viewEditForm(note, id)
    builder.createCategorySelect(Note.getCategories())
  }
}

noteController.updateNote = function(data) {  
  let note = Note.findById(Session.getData().editNoteId)
  if (note) {
    note.update(data)
  }
  this.interruptEdit()
}

noteController.discardNoteForm = function() {
  builder.hideNoteForm()
  this.interruptEdit()
}

noteController.refreshView = function() {
  builder.refreshNotesTable(Note.findAll(), Session.getData().archiveTableStatus)
  builder.refreshStatsTable(Note.findAll(), Note.getCategories())
} 

noteController.showCreateForm = function() {
  builder.viewCreateForm()
  builder.createCategorySelect(Note.getCategories())
}

noteController.hideNoteForm = function() {
  builder.hideNoteForm()  
}

noteController.initTables = function() {
  Note.initiateNotesData()
  this.refreshView()
}

export default noteController