import { cleanup } from "@testing-library/react"

export interface NoteFormData {
  name: string,
  categoryName: string,
  content: string
}

export interface Category {
  categoryName: string,
  categoryIcon: string
}

export interface Note {
  id: number,
  name: string,
  createDate: Date,
  archivedStatus: boolean,
  content: string,
  category: Category,
  editStatus: boolean
}

export interface CategoryStats {
  category: Category,
  active: number,
  archived: number
}

function extractDates(note: Note): string {
  let stringDates = (note.content + note.name).match(/[0-9]{1,2}([\-/ \.])[0-9]{1,2}[\-/ \.][0-9]{4}/g)
  if (stringDates == null) {
    return ""
  }
  let dates = stringDates.map((date) => {
    return convertStringToDate(date)
  })
  return stringifyDatesList(dates)
}

function cleanUpFormData(data: NoteFormData):NoteFormData {
  return {
    name: data.name.trim(),
    content: data.content.trim(),
    categoryName: data.categoryName.trim()
  }
}

function createNote(data: NoteFormData, noteId: number):Note {
  return {
    id: noteId,
    name: data.name,
    createDate: new Date(),
    archivedStatus: false,
    content: data.content,
    category: { categoryName: data.categoryName, categoryIcon: "" },
    editStatus: false
  }
}

function convertStringToDate(stringDate: string) {
  let stringDayMonthYear = stringDate.match(/\d+/g)
  if (stringDayMonthYear == null) {
    return new Date()
  }
  let numberDayMonthYear = stringDayMonthYear.map((value) => { return parseInt(value) })
  return new Date(...formatDateNumbers(numberDayMonthYear))
}

function formatDateNumbers(numbers: number[]) {
  let month = numbers[1]
  let day = numbers[0]
  if (month > 12) {
    month = numbers[0]
    day = numbers[1]
  }
  const result = [numbers[2], month - 1, day] as const
  return result
}

function stringifyDatesList(dates: Date[]) {
  if (dates == null || !dates.length) {
    return ""
  }
  return dates.map((date) => {
    return formatDate(date)
  }).join(", ")
}

function formatDate(date: Date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const categoriesList = [
  { categoryName: "Task", categoryIcon: "fa-solid fa-thumbtack" },
  { categoryName: "Idea", categoryIcon: "fa-solid fa-gears" },
  { categoryName: "Random Thought", categoryIcon: "fa-solid fa-lightbulb" }
]

let initialNotesList:Note[] = [
  {id: 1, name: "Buy Books", createDate: new Date(), category: categoriesList[0], 
      content: "Do this in 19 11 2022 and in 16-10-2022",  archivedStatus: false, editStatus: false},
  {id: 2, name: "Buy More Books", createDate: new Date(), category: categoriesList[1], 
      content: "Do this in 19.11.2022 and in 16/10/2022", archivedStatus: false, editStatus: false},
  {id: 3, name: "Read Books", createDate: new Date(), category: categoriesList[2], 
      content: "Do this in 19 11 2022 and in 16-10-2022", archivedStatus: false, editStatus: false},
  {id: 4, name: "Sell Books", createDate: new Date(), category: categoriesList[1],
      content: "Never do this", archivedStatus: false, editStatus: true},
  {id: 5, name: "Gym", createDate: new Date(), category: categoriesList[0], 
      content: "Go to the gym in 19.10.2022", archivedStatus: true, editStatus: false}
]



export let noteService = {
  extractDates: extractDates,
  createNote: createNote,
  formatDate: formatDate,
  validate: validate,
  cleanUpFormData: cleanUpFormData,
  getCategoryStats: getCategoryStats,
  initialNotesList: initialNotesList,
  categoriesList: categoriesList
}

export function getCategoryStats(notes: Note[], category: Category):CategoryStats {
  let categoryStats = { category: category, active: 0, archived: 0 }
  notes.forEach(note => {
    if (note.category.categoryName == category.categoryName) {
      if (note.archivedStatus) {
        categoryStats.archived++
      } else {
        categoryStats.active++
      }
    }
  })
  return categoryStats
}

// notesList: [
//   {
//     id: 1, name: "task1", createDate: new Date(), archivedStatus: false,
//     content: "do task 1 in 19-11-2022",
//     category: { categoryName: "Task", categoryIcon: "fa-solid fa-thumbtack" }, editStatus: false
//   },
//   {
//     id: 2, name: "task2", createDate: new Date(), archivedStatus: false,
//     content: "do task 2 in 19 11 2022 and in 16-10-2022",
//     category: { categoryName: "Task", categoryIcon: "fa-solid fa-thumbtack" }, editStatus: false
//   },
//   {
//     id: 3, name: "task3", createDate: new Date(), archivedStatus: false,
//     content: "do task 3 in 19.11.2022 and in 16/10/2022",
//     category: { categoryName: "Task", categoryIcon: "fa-solid fa-thumbtack" }, editStatus: false
//   },
//   {
//     id: 4, name: "task4", createDate: new Date(), archivedStatus: true,
//     content: "Just nice thought",
//     category: { categoryName: "Random Thought", categoryIcon: "fa-solid fa-lightbulb" }, editStatus: false
//   }
// ]

// export interface Note {

function validate(note: Note, categories: Category[]) {
  let errors = []
  if (note.name == "") {
    errors.push("Note name is required.")
  }
  if (note.category.categoryName == "") {
    errors.push("Note category is required.")
  }
  let category = categories.find((category) => {
    return note.category.categoryName === category.categoryName
  })
  if (!category) {
    errors.push("Category has to be one of the list.")
  } else {
    note.category = category
  }
  if (note.content == "") {
    errors.push("Note content is required.")
  }
  return errors
}

