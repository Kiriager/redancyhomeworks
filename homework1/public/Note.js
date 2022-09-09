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

  this.data = {
    name: this.data.name.trim(),
    createDate: new Date(),
    category: this.data.category.trim(),
    content: this.data.content.trim(),
    archived: false
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

Note.prototype.edit = function() {}

export default Note