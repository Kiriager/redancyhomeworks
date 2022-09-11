/* Build notes' table functions*/

function createNotesTableHTML(notes, archiveStatus) {
  let tableHTML = ""
  notes.forEach((note, index) => {
    if (archiveStatus == note.data.archived) {
      tableHTML += createNoteHTML(note, index)
    }
  })
  return tableHTML
}

function createNoteHTML(note, id) {
  return `
  <tr id="note${id}">
    <td>${note.data.name}</td>
    <td>${note.data.createDate}</td>
    <td>${note.data.category}</td>
    <td>${note.data.content}</td>
    <td>${getDates(note)}</td>
    <td><button class="edit-note-button">Edit Icon</button></td>
    <td><button class="archive-note-button">Archive Icon</button></td>
    <td><button class="delete-note-button">Delete Icon</button></td>
  </tr>
  `
}

function getDates(note) {
  return note.data.createDate
}

/* Build statistics table functions */

function getCategoryStats(notes, category) {
  let categoryStats = {name: category, active: 0, archived: 0}
  notes.forEach(note => {
    if (note.data.category == category) {
      if(note.data.archived) {
        categoryStats.archived++
      } else {
        categoryStats.active++
      }
    }
  })
  return categoryStats
}

function createCategoryHTML(categoryStats) {
  return `
  <tr>
    <td>${categoryStats.name}</td>
    <td>${categoryStats.active}</td>
    <td>${categoryStats.archived}</td>
  </tr>
  `
}

function createCategoriesTableHTML(notes, categories) {
  let tableHTML = ""
  categories.forEach(category => {
    tableHTML += createCategoryHTML(getCategoryStats(notes, category))
  })
  return tableHTML
}

/* Build categories select*/

function createCategoriesSelectHTML(categories) {
  let optionsHTML = ""
  categories.forEach((category) => {
    optionsHTML += `<option value="${category}">${category}</option>`
  })
  return optionsHTML
}

let builder = {}

builder.refreshStatsTable = function (notesList, categories) {
  document.getElementById("stats-body").innerHTML = createCategoriesTableHTML(notesList, categories)
}

builder.refreshNotesTable = function (notesList, archived) {
  document.getElementById("notes-body").innerHTML = createNotesTableHTML(notesList, archived)
}

builder.createCategorySelect = function (categories) {
  document.getElementById("category").innerHTML = createCategoriesSelectHTML(categories)  
}

builder.viewCreateForm = function() {
  document.getElementById("create-note-button").hidden = true
  document.getElementById("note-form").hidden = false
  document.getElementById("submit-note-form").classList = "add-note"
}

builder.viewEditForm = function(note) {
  document.getElementById("name").value = note.data.name
  document.getElementById("category").value = note.data.category
  document.getElementById("content").value = note.data.content
  
  document.getElementById("note-form").hidden = false
  document.getElementById("create-note-button").hidden = true
  document.getElementById("submit-note-form").classList = "update-note"
}

builder.hideNoteForm = function() {
  document.getElementById("note-form").reset()
  document.getElementById("note-form").hidden = true
  document.getElementById("create-note-button").hidden = false
}

builder.hideNote = function(id) {
  document.getElementById(`note${id}`).hidden = true
}

builder.viewNote = function(id) {
  document.getElementById(`note${id}`).hidden = false
}

builder.switchArchiveElements = function(status) {
  document.getElementById("create-note-button").hidden = status
  if (status) {
    document.getElementById("swap-table-status").innerHTML = "Show Active Notes"
  } else {
    document.getElementById("swap-table-status").innerHTML = "Show Archive Notes"
  }
}

export default builder