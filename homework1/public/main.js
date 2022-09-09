import {categories, notesList} from "./db.js"
import Note from "./Note.js"
import {init, refreshStatsTable, refreshNotesTable} from "./builder.js"


init(notesList, categories)

function showNoteForm() {
  document.getElementById("create-note-form").hidden = false
  document.getElementById("create-note-button").hidden = true  
}

function hideNoteForm() {
  document.getElementById("create-note-form").reset()
  document.getElementById("create-note-form").hidden = true
  document.getElementById("create-note-button").hidden = false  
}

function createNote() {
  let note = new Note(getFormData())
  hideNoteForm()

  note.create()
  
  if (!note.errors.length) {
    notesList.push(note)
    refreshNotesTable(notesList, false)
    refreshStatsTable(notesList, categories)
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

document.getElementById("create-note-button").addEventListener("click", showNoteForm)

document.getElementById("discard-note-form").addEventListener("click", hideNoteForm)
document.getElementById("submit-note-form").addEventListener("click", createNote)

document.addEventListener("click", function (e) {
  //delete
  if (e.target.classList.contains("delete-note-button")) {
    if (confirm("Sure?")) {
      notesList.splice(e.target.parentElement.parentElement.id.match(/(\d+)/)[0], 1)
      refreshNotesTable(notesList, false)
      refreshStatsTable(notesList, categories)
    }
  }

  if (e.target.classList.contains("archive-note-button")) {
    notesList.splice(e.target.parentElement.parentElement.id.match(/(\d+)/)[0], 1)
    refreshNotesTable(notesList, false)
    refreshStatsTable(notesList, categories)
  }

})