import noteController from "./noteController.js"

noteController.initTables()

document.addEventListener("click", function (e) {
  if (e.target.id == "create-note-button") {
    noteController.showCreateForm()
  }
  if (e.target.id == "discard-note-form") {
    noteController.discardNoteForm()
  }
  if (e.target.id == "swap-table-status") {
    noteController.switchArchiveStatus()
  }
  if (e.target.classList.contains("add-note")) { 
    noteController.createNote(getFormData())
  }
  if (e.target.classList.contains("update-note")) { 
    noteController.updateNote(getFormData())
  }
  if (e.target.classList.contains("delete-note-button")) { 
    noteController.deleteNote(e.target.parentElement.parentElement.id.match(/(\d+)/)[0])
  }
  if (e.target.classList.contains("archive-note-button")) {
    noteController.switchNoteArchived(e.target.parentElement.parentElement.id.match(/(\d+)/)[0])
  }
  if (e.target.classList.contains("edit-note-button")) { 
    noteController.initEditSession(e.target.parentElement.parentElement.id.match(/(\d+)/)[0])
  }
})

function getFormData() {
  return {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    content: document.getElementById("content").value,
  }
}
