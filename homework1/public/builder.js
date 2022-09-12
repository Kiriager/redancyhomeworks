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
    <td>${getFormateDate(note.data.createDate)}</td>
    <td>${note.data.category}</td>
    <td>${note.data.content}</td>
    <td>${getDates(note)}</td>
    <td><button class="edit-note-button"><i class="fa-solid fa-pen-to-square"></i></button></td>
    <td><button class="archive-note-button"><i class="fa-solid fa-box-archive"></i></button></td>
    <td><button class="delete-note-button"><i class="fa-solid fa-trash"></i></button></td>
  </tr>
  `
}

function getFormateDate(date) {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
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
  document.getElementById("new-note").innerHTML = this.createFormRowHTML()
  document.getElementById("submit-note-form").classList = "add-note"
}

builder.viewEditForm = function(note, id) {
  document.getElementById(`note${id}`).innerHTML = this.createFormRowHTML(note)

  document.getElementById("name").value = note.data.name
  document.getElementById("category").value = note.data.category
  document.getElementById("content").value = note.data.content
  
  document.getElementById("create-note-button").hidden = true
  document.getElementById("submit-note-form").classList = "update-note"
}

builder.hideNoteForm = function() {
  document.getElementById("create-note-button").hidden = false
  document.getElementById("new-note").innerHTML = ""
}

builder.switchArchiveElements = function(status) {
  document.getElementById("create-note-button").hidden = status
  if (status) {
    document.getElementById("swap-table-status").innerHTML = "Show Active Notes"
  } else {
    document.getElementById("swap-table-status").innerHTML = "Show Archive Notes"
  }
}

builder.createFormRowHTML = function(note) {
  let dates = ""
  let createDate = ""
  
  if (typeof(note) != "undefined") {
    createDate = note.data.createDate
    dates = getDates(note)
  }
 
  return `
    <td><input type="text" id="name" name="name" autocomplete="off" form="note-form"></td>
    <td>${createDate}</td>
    <td><select form="note-form" name="category" id="category"></select></td>
    <td><input form="note-form" type="text" id="content" name="content" autocomplete="off"></td>
    <td>${dates}</td>
    <td><button form="note-form" type="button" class="add" id="submit-note-form"><i class="fa-solid fa-check"></i></button></td>
    <td><button form="note-form" type="button" id="discard-note-form"><i class="fa-solid fa-xmark"></i></button></td>
    <td></td>
  `
}

export default builder