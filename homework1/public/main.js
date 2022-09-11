import {db} from "./db.js"
import Note from "./Note.js"
import {initTables, refreshStatsTable, refreshNotesTable} from "./builder.js"

let archiveTableStatus = false

initTables(db.notes, db.categories)

function showCreateForm() {
  document.getElementById("create-note-button").hidden = true
  document.getElementById("note-form").hidden = false
  document.getElementById("submit-note-form").classList = "add-note"
}

function showEditForm(noteId) {
  document.getElementById("name").value = db.notes[noteId].data.name
  document.getElementById("category").value = db.notes[noteId].data.category
  document.getElementById("content").value = db.notes[noteId].data.content
  
  document.getElementById("note-form").hidden = false
  document.getElementById("create-note-button").hidden = true
  document.getElementById("submit-note-form").classList = "update-note" 
}

function hideNoteForm() {
  document.getElementById("note-form").reset()
  document.getElementById("note-form").hidden = true
  document.getElementById("create-note-button").hidden = false  
}

function createNote() {
  let note = new Note(getFormData())
  hideNoteForm()

  note.create()
  
  if (!note.errors.length) {
    db.notes.push(note)
    refreshNotesTable(db.notes, archiveTableStatus)
    refreshStatsTable(db.notes, db.categories)
  } else {
    console.log(note.errors);
  }
}

function getFormData() {
  return {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    content: document.getElementById("content").value,
  }
}

document.getElementById("create-note-button").addEventListener("click", showCreateForm)

document.addEventListener("click", function (e) {
  if (e.target.id == "swap-table-status") {
    hideNoteForm()
    interruptEditSession()
    swapArchiveTableStatus()
    refreshNotesTable(db.notes, archiveTableStatus)
  }

  if (e.target.id == "discard-note-form") {
    hideNoteForm()
    interruptEditSession()
    refreshNotesTable(db.notes, archiveTableStatus)
  }

  if (e.target.classList.contains("add-note")) { 
    createNote()
  }

  //delete
  if (e.target.classList.contains("delete-note-button")) {
    interruptEditSession()
    refreshNotesTable(db.notes, archiveTableStatus)
    if (confirm("Sure?")) {
      let id = e.target.parentElement.parentElement.id.match(/(\d+)/)[0]
      if (isValidNoteId(id)) {
        db.notes.splice(id, 1)
      }
      refreshNotesTable(db.notes, archiveTableStatus)
      refreshStatsTable(db.notes, db.categories)
    }
  }
  //archive
  if (e.target.classList.contains("archive-note-button")) {
    //interruptEditSession()
    let id = e.target.parentElement.parentElement.id.match(/(\d+)/)[0]
    if (isValidNoteId(id)) {
      db.notes[id].setArchivedStatus(!archiveTableStatus)
    }
    
    refreshNotesTable(db.notes, archiveTableStatus)
    refreshStatsTable(db.notes, db.categories)
  }
  
  //edit form
  if (e.target.classList.contains("edit-note-button")) {
    
    let id = e.target.parentElement.parentElement.id.match(/(\d+)/)[0]
    interruptEditSession()

    if (isValidNoteId(id)) {
      document.getElementById(`note${id}`).hidden = true
      db.editNoteId = id
      showEditForm(db.editNoteId)
    }
    
  }

  //update
  if (e.target.classList.contains("update-note")) {
    console.log("update");
    
    if (db.editNoteId != -1) {
      db.notes[db.editNoteId].update(getFormData())
      if (db.notes[db.editNoteId].errors.length) {
        console.log(db.notes[db.editNoteId].errors);
        db.notes[db.editNoteId].errors = []
      }
    }
   
    interruptEditSession()
    refreshNotesTable(db.notes, archiveTableStatus)
    refreshStatsTable(db.notes, db.categories)
  }

})

function isValidNoteId(noteId) {
  if (parseInt(noteId) < 0 || parseInt(noteId) >= db.notes.length) {
    return false
  }
  return true
}

function interruptEditSession() {
  if (db.editNoteId != -1) {
    document.getElementById(`note${db.editNoteId}`).hidden = false
    db.editNoteId = -1
    hideNoteForm()
  }
}

function swapArchiveTableStatus() {
  if (archiveTableStatus) {
    archiveTableStatus = false
    document.getElementById("swap-table-status").innerHTML = "Show Archive Notes"
    document.getElementById("create-note-button").hidden = false
  } else {
    document.getElementById("swap-table-status").innerHTML = "Show Active Notes"
    archiveTableStatus = true
    document.getElementById("create-note-button").hidden = true
  }
}