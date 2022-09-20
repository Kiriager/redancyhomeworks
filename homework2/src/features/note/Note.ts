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

function createNote(data: NoteFormData, noteId: number) {
  return {
    id: noteId,
    name: data.name.trim(),
    createDate: new Date(),
    archivedStatus: false,
    content: data.content.trim(),
    category: {categoryName: data.categoryName, categoryIcon: ""},
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

let categoriesList = [
  { categoryName: "Task", categoryIcon: "fa-solid fa-thumbtack" },
  { categoryName: "Idea", categoryIcon: "fa-solid fa-gears" },
  { categoryName: "Random Thought", categoryIcon: "fa-solid fa-lightbulb" }
]

let initialNotesList = [
  createNote({name: "Buy Books", categoryName: "Idea", content: "Do this in 19 11 2022 and in 16-10-2022"}, 1),
  createNote({name: "Buy More Books", categoryName: "Idea", content: "Do this in 19.11.2022 and in 16/10/2022"}, 2),
  createNote({name: "Read Books", categoryName: "Idea", content: "Do this in 19 11 2022 and in 16-10-2022"}, 3),
  createNote({name: "Sell Books", categoryName: "Random Thought", content: "Never do this"}, 4),
  createNote({name: "Gym", categoryName: "Task", content: "Go to the gym in 19.10.2022"}, 5)
]


export let noteService = {
  extractDates: extractDates,
  createNote: createNote,
  formatDate: formatDate,
  initialNotesList: initialNotesList,
  categoriesList: categoriesList
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
 

//       id: ++Note.previousId,
//       name: data.name.trim(),
//       createDate: new Date(),
//       archivedStatus: false,
//       content: data.content.trim(),
//       category: { categoryName: data.categoryName.trim(), categoryIcon: "" },
//       editStatus: false

//   validate(categories: Category[]) {
    
//     if (this.data.name == "") {
//       this.errors.push("Note name is required.")
//     }
//     if (this.data.category.categoryName == "") {
//       this.errors.push("Note category is required.")
//     }

//     let category = categories.find((category) => {
//       return category.categoryName === this.data.category.categoryName
//     })
//     if (!category) {
//       this.errors.push("Category has to be one of the list.")
//     } else {
//       this.data.category = category
//     }
//     if (this.data.content == "") {
//       this.errors.push("Note content is required.")
//     }
    
//   }

//   extractDates(): string {
//     let stringDates = (this.data.content + this.data.name).match(/[0-9]{1,2}([\-/ \.])[0-9]{1,2}[\-/ \.][0-9]{4}/g)
//     if (stringDates == null) {
//       return ""
//     }
//     let dates = stringDates.map((date) => {
//       return convertStringToDate(date)
//     })
//     return stringifyDatesList(dates)
//   }

//   getCreateDateString() {
//     return formatDate(this.data.createDate)
//   }
// }
