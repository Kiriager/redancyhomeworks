import {db} from "./db.js"

let Session = {}

Session.getData = function() {
  return db.sessionData
}

Session.interruptEditNote = function() {
  db.sessionData.editNoteId = -1
}

Session.setEditSession = function(id) {
  db.sessionData.editNoteId = id
}

Session.switchArchiveStatus = function() {
  db.sessionData.archiveTableStatus = !db.sessionData.archiveTableStatus
}

export default Session