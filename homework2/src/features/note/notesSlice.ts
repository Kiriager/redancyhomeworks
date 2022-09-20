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



const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<NoteFormData>) => {
      state.showCreateForm = false
      let formData = noteService.cleanUpFormData(action.payload)
      let note = noteService.createNote(formData, state.ids)
      let errors = noteService.validate(note, state.categoriesList)
      if(!errors.length) {
        state.notesList.push(note);      
        state.ids++
      } else {
        console.log(errors);
      }
    },
    edit: (state, action: PayloadAction<{data: NoteFormData, noteId: number}>) => {
      let note = state.notesList.find((note) => { return note.id === action.payload.noteId })
      if (typeof (note) != 'undefined') {
        note.editStatus = false
        let formData = noteService.cleanUpFormData(action.payload.data)
        let updateNote = noteService.createNote(formData, state.ids)
        let errors = noteService.validate(updateNote, state.categoriesList)
        if(!errors.length) {
          note.name = updateNote.name
          note.content = updateNote.content
          note.category = updateNote.category
        } else {
          console.log(errors);
        }
      }
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
    },
    discardEditForm: (state, action: PayloadAction<number>) => {
      let note = state.notesList.find((note) => { return note.id === action.payload })
      if (typeof (note) != 'undefined') {
        note.editStatus = false
      }
    },
    initiateEditNote: (state, action: PayloadAction<number>) => {
      let note = state.notesList.find((note) => { return note.id === action.payload })
      if (typeof (note) != 'undefined') {
        note.editStatus = true
      }
    }

  },
  
});

export const { add, edit, switchArchiveStatus, remove, switchTableArchiveStatus, 
    showCreateForm, hideCreateForm, discardEditForm, initiateEditNote} = noteSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectCategories = (state: RootState) => state.notes.categoriesList;




// export selectCategories = (state) => {
//   retrun state
// }

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default noteSlice.reducer;
