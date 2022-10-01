import React, { useState } from 'react';
import { Category, CategoryStats, Note, noteService } from "./Note";
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  switchArchiveStatus, remove, edit, switchTableArchiveStatus, 
  showCreateForm, hideCreateForm, add, discardEditForm, initiateEditNote, 
  setAllNotesArchiveStatus, removeAll
} from './notesSlice';


export function NotesTable() {
  const dispatch = useAppDispatch()
  const formStatus = useAppSelector(state => state.notes.showCreateForm)
  const tableArchiveStatus = useAppSelector(state => state.notes.showArchiveNotes)
  return (
    <table className="notes">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Created</th>
          <th>Category</th>
          <th>Content</th>
          <th>Dates</th>
          <th></th>
          <th>
            <button id="archive-all-notes" title="Archive/Unarchaive All"
                onClick={() => dispatch(setAllNotesArchiveStatus(!tableArchiveStatus))}>
              <i className="fa-solid fa-box-archive"></i>
            </button>
          </th>
          <th>
            <button id="delete-table-all-notes" title="Delete All"
                  onClick={() => dispatch(removeAll())}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </th>
        </tr>
      </thead>
      <NoteRows />
      <tfoot>{formStatus ? <NoteForm /> : !tableArchiveStatus ? <CreateNoteButton /> : <></>}</tfoot>
    </table>

  )
}

export function CreateNoteButton() {
  const dispatch = useAppDispatch()
  return (
    <tr><td colSpan={9} id="create-button-container">
      <button id="create-note-button" className="outside"
          onClick={() => dispatch(showCreateForm())}>
        Create Note
      </button>
    </td></tr>
  )
}

export function TableArchiveStatusButton() {
  const tableArchiveStatus = useAppSelector(state => state.notes.showArchiveNotes)
  const dispatch = useAppDispatch();
  return (
    <button id="swap-table-status" className="outside"
      onClick={() => dispatch(switchTableArchiveStatus())}>
      {tableArchiveStatus ? "Show active notes" : "Show archived notes"}
    </button>
  )
}

export function StatsTable() {
  const notes = useAppSelector(state => state.notes.notesList)
  const categories = useAppSelector(state => state.notes.categoriesList)

  return (
    <table id="stats">
      <thead>
        <tr><th></th><th>Note Category</th><th>Active</th><th>Archived</th></tr>
      </thead>
      <tbody>
        {categories.map((category, index) => {
          return (<CategoryStatsRow 
              {...noteService.getCategoryStats(notes, category)} key={"stats" + index}/>)
        })}
      </tbody>
    </table>
  )
}

function CategoryStatsRow(categoryStats: CategoryStats) {
  return (
    <tr>
      <td><CategoryIcon {...categoryStats.category} /></td>
      <td>{categoryStats.category.categoryName}</td>
      <td>{categoryStats.active}</td>
      <td>{categoryStats.archived}</td>
    </tr>
  )
}

function CategoryIcon(category: Category) {
  return (
    <div className="task-icon-container">
      <i className={category.categoryIcon}></i>
    </div>
  )
}

function SingleNote(note: Note) {
  const dispatch = useAppDispatch();
  return (
    <tr>
      <td><CategoryIcon {...note.category} /></td>
      <td>{note.name}</td>
      <td>{noteService.printMyDate(note.createDate)}</td>
      <td>{note.category.categoryName}</td>
      <td>{note.content}</td>
      <td>{noteService.extractDates(note)}</td>
      <td>
        <button className="edit-note-button" title="Edit Note"
          onClick={() => dispatch(initiateEditNote(note.id))}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </td>
      <td>
        <button className="archive-note-button" title="Archive/Unarchive Note"
          onClick={() => dispatch(switchArchiveStatus(note.id))}>
          <i className="fa-solid fa-box-archive"></i>
        </button>
      </td>
      <td>
        <button className="delete-note-button" title="Delete Note"
          onClick={() => dispatch(remove(note.id))}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  )
}

function NoteRows() {
  const notes = useAppSelector(state => state.notes.notesList)
  const tableArchiveStatus = useAppSelector(state => state.notes.showArchiveNotes)
  return (
    <tbody>
      {notes.filter((note) => { return note.archivedStatus === tableArchiveStatus }).map((note) => {
        if (note.editStatus) {
          return (<EditNoteForm {...note} key={"note" + note.id}/>)
        } else {
          return (<SingleNote {...note} key={"note" + note.id}/>)
        }
        })
      }
    </tbody>
  )
}

function NoteForm() {
  const dispatch = useAppDispatch()
  const [name, setName] = useState("")
  const [categoryName, setCategoryName] = useState(useAppSelector(state => {
    return state.notes.categoriesList[0].categoryName}))
  const [content, setContent] = useState("")

  return (
    <tr id="new-note">
      <td></td>
      <td>
        <input type="text" name="name" autoComplete="off"
          value={name}
          onChange={(e) => { setName(e.target.value) }} />
      </td>
      <td></td>
      <td>
        <select name="category" value={categoryName}
          onChange={(e) => { setCategoryName(e.target.value) }}>
          <CategoryOptions />
        </select>
      </td>
      <td>
        <input type="text" name="content" autoComplete="off" value={content}
          onChange={(e) => { setContent(e.target.value) }} />
      </td>
      <td></td>
      <td>
        <button type="button" className="add" title="Save Note"
          onClick={() => dispatch(add({ name: name, categoryName: categoryName, content: content }))}>
          <i className="fa-solid fa-check"></i>
        </button>
      </td>
      <td>
        <button type="button" title="Discard Changes" onClick={() => dispatch(hideCreateForm())}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </td>
      <td></td>
    </tr>
  )
}

function CategoryOptions() {
  let categories = useAppSelector(state => state.notes.categoriesList)
  return (
    <>
      {categories.map((category, index) => {
        return(<option key={"cat" + index} value={category.categoryName}>{category.categoryName}</option>)
      })}
    </>
  )
}

function EditNoteForm(note: Note) {
  const dispatch = useAppDispatch()
  const [name, setName] = useState(note.name)
  const [categoryName, setCategoryName] = useState(note.category.categoryName)
  const [content, setContent] = useState(note.content)

  return (
    <tr>
      <td><CategoryIcon {...note.category} /></td>
      <td>
        <input type="text" name="name" autoComplete="off"
          value={name}
          onChange={(e) => { setName(e.target.value) }} />
      </td>
      <td>{noteService.printMyDate(note.createDate)}</td>
      <td>
        <select name="category" value={categoryName}
          onChange={(e) => { setCategoryName(e.target.value) }}>
          <CategoryOptions />
        </select>
      </td>
      <td>
        <input type="text" name="content" autoComplete="off" value={content}
          onChange={(e) => { setContent(e.target.value) }} />
      </td>
      <td>{noteService.extractDates(note)}</td>
      <td>
        <button type="button" className="add" title="Save Note"
          onClick={() => dispatch(edit({
            data: {name: name, categoryName: categoryName, content: content}, 
            noteId: note.id}))}>
          <i className="fa-solid fa-check"></i>
        </button>
      </td>
      <td>
        <button type="button" title="Discard Changes" 
            onClick={() => dispatch(discardEditForm(note.id))}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </td>
      <td></td>
    </tr>
  )
}
