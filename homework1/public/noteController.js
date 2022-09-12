import Note from "./Note.js"
import Session from "./Session.js"
import builder from "./builder.js"

const noteController = {}

noteController.deleteAllInTable = function() {
  if (confirm("Sure?")) {
    Note.deleteAllInTable()
    refreshView()
  }
}

noteController.switchAllArchived = function() {
  Note.switchAllArchived()
  refreshView()
}

noteController.deleteNote = function(id) {
  if (confirm("Sure?")) {
    let note = Note.findById(id)
    if (note) {
      Note.delete(id)    
      refreshView()
    }
  }
}


noteController.switchArchiveStatus = function() {
  Session.switchArchiveStatus()
  builder.hideNoteForm()
  builder.switchArchiveElements(Session.getData().archiveTableStatus)
  interruptEdit()
}

noteController.createNote = function(formData) {
  let note = new Note(formData)
  note.create()
  builder.hideNoteForm()//errs view
  if (!note.errors.length) {
    refreshView()
  }
}

noteController.switchNoteArchived = function(id) {
  let note = Note.findById(id)
  if (note) {
    note.switchNoteArchived()    
    refreshView()
  }
}

noteController.initEditSession = function(id) {
  interruptEdit()
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
  interruptEdit()
}

noteController.discardNoteForm = function() {
  builder.hideNoteForm()
  this.interruptEdit()
}

noteController.showCreateForm = function() {
  builder.viewCreateForm()
  builder.createCategorySelect(Note.getCategories())
}

noteController.initTables = function() {
  Note.initiateNotesData()
  refreshView()
}

function refreshView() {
  builder.refreshNotesTable(Note.findAll(), Session.getData().archiveTableStatus)
  builder.refreshStatsTable(Note.findAll(), Note.getCategories())
} 

function interruptEdit() {
  Session.interruptEditNote()
  refreshView()
  builder.hideNoteForm()
}




export default noteController