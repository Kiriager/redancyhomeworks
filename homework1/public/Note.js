import {db} from "./db.js"
import Session from "./Session.js"

let Note = function(data) {
  this.data = data
  this.errors = []
}

Note.initiateNotesData = function() {
  db.notes = [
    new Note({name: "Buy books", createDate: new Date(), category: "Task",
      content: "Buy some books in 14/09/2022", archived: false}),
    new Note({name: "More books", createDate: new Date(), category: "Idea", 
        content: "Buy some more books in 25/10/2022", archived: true}),
    new Note({name: "Sell books", createDate: new Date(), category: "Random Thought",
        content: "Sell some books", archived: true}),
    new Note({name: "Read books", createDate: new Date(), category: "Idea",
        content: "Read some books in 25-11-2022", archived: false}),
    new Note({name: "Learn React", createDate: new Date(), category: "Task",
        content: "Learn in 25-11-2022 and in 20.12.2022", archived: false}),
    new Note({name: "Learn Node", createDate: new Date(), category: "Task",
        content: "Learn continuesly", archived: false}),
    new Note({name: "Go to gym in 10 19 2022", createDate: new Date(), category: "Idea",
        content: "Don't forget about health", archived: false})
  ]
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
  this.data.archived = !Session.getData().archiveTableStatus
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

Note.delete = function(id) {
  db.notes.splice(id, 1)
}

Note.prototype.getDates = function() {
  let dates = (this.data.content + this.data.name).match(/[0-9]{1,2}([\-/ \.])[0-9]{1,2}[\-/ \.][0-9]{4}/g)
  if (dates == null) {
    return [this.data.createDate]
  }
  dates = dates.map((date) => {
    return convertStringToDate(date)
  })
  return dates.concat(this.data.createDate)
}

function convertStringToDate(stringDate) {
  let numbers = stringDate.match(/\d+/g).map((value) => {return parseInt(value)})
  return new Date(...formateDateNumbers(numbers))
}

function formateDateNumbers(numbers) {
  let month = numbers[1]
  let day = numbers[0]
  if (month > 12) {
    month = numbers[0]
    day = numbers[1]
  }
  return [numbers[2], month - 1, day]
}

Note.switchAllArchived = function() {
  db.notes.forEach((note) => {
    note.switchNoteArchived()
  })
}

Note.deleteAllInTable = function() {
  for (let i = 0; i < db.notes.length; i++) {
    if (db.notes[i].data.archived == Session.getData().archiveTableStatus) {
      console.log(i)
      Note.delete(i)
      i--
    } 
  }
}

export default Note