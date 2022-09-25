import { Note } from "./models/Note";
import { Category } from "./models/Category";

interface DbObject {
  notesList: Note[],
  categoriesList: Category[],
}

export const db = {
  notesList: [],
  categoriesList: []
}