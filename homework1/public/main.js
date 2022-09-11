import controller from "./controller.js"

controller.initTables()

document.getElementById("create-note-button").addEventListener("click", controller.showCreateForm)
document.getElementById("swap-table-status").addEventListener("click", controller.swapTableArchiveStatus)

document.addEventListener("click", function (e) {
  // if (e.target.id == "swap-table-status") {
  //   controller.swapTableArchiveStatus()
  // }

  if (e.target.id == "swap-table-status") {
    controller.swapTableArchiveStatus()
  }

  if (e.target.id == "discard-note-form") {
    controller.discardNoteForm()
  }

  if (e.target.classList.contains("add-note")) { 
    controller.createNote(getFormData())
  }

  if (e.target.classList.contains("delete-note-button")) { 
    controller.deleteNote(e.target.parentElement.parentElement.id.match(/(\d+)/)[0])
  }
  
  if (e.target.classList.contains("archive-note-button")) {
    controller.switchNoteArchived(e.target.parentElement.parentElement.id.match(/(\d+)/)[0])
  }
  
  if (e.target.classList.contains("edit-note-button")) { 
    controller.initEditSession(e.target.parentElement.parentElement.id.match(/(\d+)/)[0])
  }

  if (e.target.classList.contains("update-note")) { 
    controller.updateNote(getFormData())
  }
})

function getFormData() {
  return {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    content: document.getElementById("content").value,
  }
}
