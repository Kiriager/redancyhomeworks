import {db} from "./db.js"

let Note = function(data) {
  this.data = data
  this.errors = []
}

Note.prototype.cleanUp = function() {
  if (typeof(this.data.name) != "string") {
    this.data.name = ""
  }
  if (typeof(this.data.content) != "string") {
    this.data.content = ""
  }
  if (typeof(this.data.category) != "string") {
    this.data.category = ""
  }
  if (!this.data.createDate) {
    this.createDate = new Date()
  }

  this.data = {
    name: this.data.name.trim(),
    createDate: this.createDate,
    category: this.data.category.trim(),
    content: this.data.content.trim(),
    archived: false,
    editStatus: false
  }
}

Note.prototype.validate = function() {
  if (this.data.name == "") {
    this.errors.push("Note name is required.") 
  }
  if (this.data.category == "") {
    this.errors.push("Note category is required.") 
  }
  if (!db.categories.includes(this.data.category)) {
    this.errors.push("Category has to be one of the list.") 
  }
  if (this.data.content == "") {
    this.errors.push("Note content is required.") 
  }
}

Note.prototype.create = function() {
  this.cleanUp()
  this.validate()
  if (!this.errors.length) {
    db.notes.push(this)
  } else {
    console.log(this.errors);
  }
}

Note.prototype.update = function(data) {
  let updatedNote = new Note(data)
  updatedNote.cleanUp()
  updatedNote.validate()

  if (!updatedNote.errors.length) {
    this.data.name = updatedNote.data.name
    this.data.category = updatedNote.data.category
    this.data.content = updatedNote.data.content
  } else {
    console.log(updatedNote.errors);
  }
}

Note.prototype.switchNoteArchived = function() {
  this.data.archived = !db.sessionData.archiveTableStatus
}

Note.findById = function(noteId) {
  try {
    return db.notes[noteId]
  } catch {
    return false
  }
}

Note.findAll = function() {
  return db.notes
}

Note.getCategories = function() {
  return db.categories
}

Note.getSessionData = function() {
  return db.sessionData
}

Note.delete = function(id) {
  db.notes.splice(id, 1)
}

Note.interruptEditNote = function() {
  db.sessionData.editNoteId = -1
}

Note.setEditSession = function(id) {
  db.sessionData.editNoteId = id
}

Note.swapArchiveTableStatus = function() {
  db.sessionData.archiveTableStatus = !db.sessionData.archiveTableStatus
}

Note.initiateNotesData = function() {
  db.notes = [
    new Note({name: "buy books", createDate: new Date(), category: "Task",
      content: "buy some books", archived: false}),
    new Note({name: "buy more books", createDate: new Date(), category: "Idea", 
        content: "buy some more books", archived: false}),
    new Note({name: "sell books", createDate: new Date(), category: "Random Thought",
        content: "sell some books", archived: true}),
    new Note({name: "read books", createDate: new Date(), category: "Task",
        content: "read some books", archived: false})
  ]
}


export default Note