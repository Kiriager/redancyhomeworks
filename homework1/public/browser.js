import Note from "./Note.js"

/* Database information simulation */

let db = [
  new Note({name: "buy books", created: new Date(), category: "Task",
      content: "buy some books", archived: false}),
  new Note({name: "buy more books", created: new Date(), category: "Idea", 
      content: "buy some more books", archived: false}),
  new Note({name: "sell books", created: new Date(), category: "Random Thought",
      content: "sell some books", archived: true}),
  new Note({name: "read books", created: new Date(), category: "Task",
      content: "read some books", archived: false})
]

let categories = ["Task", "Idea", "Random Thought"]

/* Build notes' table functions*/
function createNotesTableHTML(notes, archiveStatus) {
  let tableHTML = ""
  notes.forEach(note => {
    if (archiveStatus == note.data.archived) {
      tableHTML += createNoteHTML(note)
    }
  })
  return tableHTML
}

function createNoteHTML(note) {
  return `
  <tr>
    <td>${note.data.name}</td>
    <td>${note.data.created}</td>
    <td>${note.data.category}</td>
    <td>${note.data.content}</td>
    <td>${getDates(note)}</td>
    <td>icon</td>
    <td>icon</td>
    <td>icon</td>
  </tr>
  `
}

function getDates(note) {
  return note.data.created
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
  categories.forEach((category, index) => {
    optionsHTML += `<option value="${index}">${category}</option>`
  })
  return optionsHTML
}


/* Add HTML to template */

function init() {
  document.getElementById("notes").getElementsByTagName("tbody")[0].innerHTML = createNotesTableHTML(db, false)
  document.getElementById("stats").getElementsByTagName("tbody")[0].innerHTML = createCategoriesTableHTML(db, categories)
  document.getElementById("category").innerHTML = createCategoriesSelectHTML(categories)
}

init()

