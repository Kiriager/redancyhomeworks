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


/* Add HTML to template */

// export function initTables(notesList, categories) {
//   refreshNotesTable(notesList, false)
//   refreshStatsTable(notesList, categories)
//   document.getElementById("category").innerHTML = createCategoriesSelectHTML(categories)
// }

export function refreshStatsTable(notesList, categories) {
  document.getElementById("stats-body").innerHTML = createCategoriesTableHTML(notesList, categories)
}

export function refreshNotesTable(notesList, archived) {
  document.getElementById("notes-body").innerHTML = createNotesTableHTML(notesList, archived)
}

export function createCategorySelect(categories) {
  document.getElementById("category").innerHTML = createCategoriesSelectHTML(categories)  
}

