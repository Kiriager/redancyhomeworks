import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { noteService, Note, Category, NoteFormData } from "./Note"

export interface NotesState {
  notesList: Note[],
  categoriesList: Category[],
  showArchiveNotes: boolean,
  showCreateForm: boolean,
  ids: number
}

const initialState: NotesState = {
  categoriesList: noteService.categoriesList,
  showArchiveNotes: false,
  showCreateForm: false,
  notesList: noteService.initialNotesList,
  ids: 8
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<NoteFormData>) => {
      console.log("Hello from add");
      
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
      console.log("Hello from edit");
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
      state.notesList.forEach((note) => {note.editStatus = false})
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
    },
    setAllNotesArchiveStatus: (state, action: PayloadAction<boolean>) => {
      state.notesList.forEach((note) => {
        note.editStatus = false
        note.archivedStatus = !action.payload
      })
    },
    removeAll: (state, action: PayloadAction<boolean>) => {
      for (let i = 0; i < state.notesList.length; i++) {
        if (state.notesList[i].archivedStatus === action.payload) {
          state.notesList.splice(i, 1)
          i--
        } 
      }
    }
  },
  
});

export const { add, edit, switchArchiveStatus, remove, switchTableArchiveStatus, 
  showCreateForm, hideCreateForm, discardEditForm, initiateEditNote, 
  setAllNotesArchiveStatus, removeAll} = noteSlice.actions

export default noteSlice.reducer;
