import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { noteService, Note, Category, NoteFormData } from "./Note"
import { RootState } from '../../app/store';

//import { fetchCount } from './counterAPI';

export interface NotesState {
  notesList: Note[],
  categoriesList: Category[],
  showArchiveNotes: boolean,
  showCreateForm: boolean,
  ids: number
}

export interface CategoryStats {
  category: Category,
  active: number,
  archived: number
}

const initialState: NotesState = {
  categoriesList: [
    { categoryName: "Task", categoryIcon: "fa-solid fa-thumbtack" },
    { categoryName: "Idea", categoryIcon: "fa-solid fa-gears" },
    { categoryName: "Random Thought", categoryIcon: "fa-solid fa-lightbulb" }
  ],
  showArchiveNotes: false,
  showCreateForm: false,
  notesList: noteService.initialNotesList,
  ids: 5
}



export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    add: (state, action:  PayloadAction<NoteFormData>) => {
      console.log(action.payload);
      state.showCreateForm = false
      let formData = noteService.cleanUpFormData({
        name: action.payload.name,
        categoryName: action.payload.categoryName,
        content: action.payload.content
      })
      let note = noteService.createNote(formData, state.ids)
      let errors = noteService.validate(note, state.categoriesList)
      if(!errors.length) {
        state.notesList.push(note)
        console.log(state.notesList);
        
        state.ids++
      } else {
        console.log(errors);
      }

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

    },
    edit: (state, action: PayloadAction<number>) => {

    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    remove: (state, action: PayloadAction<number>) => {
      let noteId = state.notesList.findIndex((note) => { return note.id === action.payload })
      if (noteId >= 0) {
        state.notesList.splice(noteId, 1)
      }
    },
    switchArchiveStatus: (state, action: PayloadAction<number>) => {
      let note = state.notesList.find((note) => { return note.id === action.payload })
      if (typeof (note) != 'undefined') {
        note.archivedStatus = !note.archivedStatus
      }
    },
    switchTableArchiveStatus: (state) => {
      state.showArchiveNotes = !state.showArchiveNotes
      state.showCreateForm = false
    },
    showCreateForm: (state) => {
      state.showCreateForm = true 
    },
    hideCreateForm: (state) => {
      state.showCreateForm = false
    }

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

});

export const { add, edit, switchArchiveStatus, remove, switchTableArchiveStatus, 
    showCreateForm, hideCreateForm} = noteSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectCategories = (state: RootState) => state.notes.categoriesList;


export function getCategoryStats(notes: Note[], category: Category) {
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


// export selectCategories = (state) => {
//   retrun state
// }

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default noteSlice.reducer;
