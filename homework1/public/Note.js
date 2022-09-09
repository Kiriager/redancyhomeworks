let Note = function(data) {
  this.data = data
  this.errors = []
}

Note.prototype.cleanUp = function() {}
Note.prototype.validate = function() {}

Note.prototype.create = function() {}
Note.prototype.edit = function() {}

export default Note