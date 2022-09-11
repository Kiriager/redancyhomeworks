import {categories} from "./db.js"

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
  //console.log(this.data);
}

Note.prototype.validate = function() {
  if (this.data.name == "") {
    this.errors.push("Note name is required.") 
  }
  if (this.data.category == "") {
    this.errors.push("Note category is required.") 
  }
  if (!categories.includes(this.data.category)) {
    this.errors.push("Category has to be one of the list.") 
  }
  if (this.data.content == "") {
    this.errors.push("Note content is required.") 
  }
}

Note.prototype.create = function() {
  this.cleanUp()
  this.validate()
}

Note.prototype.update = function(data) {
  let updatedNote = new Note(data)
  updatedNote.create()
  if (!updatedNote.errors.length) {
    this.data.name = updatedNote.data.name
    this.data.category = updatedNote.data.category
    this.data.content = updatedNote.data.content
  } else {
    this.errors = updatedNote.errors
  }
}

Note.prototype.setArchivedStatus = function(status) {
  this.data.archived = status
}

export default Note