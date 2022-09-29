import { NoteData } from "./models/Note";
import { Category } from "./models/Category";

interface DbObject {
  notesCollection: NoteData[],
  categoriesCollection: Category[],
  idGenerator: number
}

const categoriesList:Category[] = [
  {id:1, categoryName: "Task", categoryIcon: "fa-solid fa-thumbtack" },
  {id:2, categoryName: "Idea", categoryIcon: "fa-solid fa-gears" },
  {id:3, categoryName: "Random Thought", categoryIcon: "fa-solid fa-lightbulb" }
]

let initialNotesList:NoteData[] = [
  {id: 4, title: "Buy Books", categoryId:1, content: "Do this in 19 11 2022 and in 16-10-2022", 
      createDate: new Date(), archiveStatus: false},
  {id: 5, title: "Buy More Books", categoryId:2, content: "Do this in 19.11.2022 and in 16/10/2022", 
      createDate: new Date(), archiveStatus: false},
  {id: 6, title: "Read Books", categoryId:3, content: "Do this in 19 11 2022 and in 16-10-2022", 
      createDate: new Date(), archiveStatus: false},
  {id: 7, title: "Sell Books", categoryId:2, content: "Never do this", 
      createDate: new Date(), archiveStatus: false},
  {id: 8, title: "Gym", categoryId:1, content: "Go to the gym in 19.10.2022", 
      createDate: new Date(), archiveStatus: true},
  {id: 9, title: "Do HW2", categoryId:1, content: "Do hw2 before 20.09.2022", 
      createDate: new Date(), archiveStatus: false},
  {id: 10, title: "Do HW3", categoryId:1, content: "Do hw3 before 30.09.2022", 
      createDate: new Date(), archiveStatus: false}
]

export const db:DbObject = {
  notesCollection: initialNotesList,
  categoriesCollection: categoriesList,
  idGenerator: 11
}