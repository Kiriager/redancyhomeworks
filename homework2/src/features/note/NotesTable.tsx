import React, { useState } from 'react';
import { CategoryStats, getCategoryStats} from "./notesSlice";
import { Category, Note, noteService } from "./Note";

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  switchArchiveStatus, remove, edit, switchTableArchiveStatus, showCreateForm, hideCreateForm, add
} from './notesSlice';

import styles from './Note.module.css';
import notesSlice from './notesSlice';

export function NotesTable() {
  const formStatus = useAppSelector(state => state.notes.showCreateForm)
  const tableArchiveStatus = useAppSelector(state => state.notes.showArchiveNotes)
  return (
    <table className={styles.notes}>
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
            <button id="archive-all-notes" title="Archive/Unarchaive All">
              <i className="fa-solid fa-box-archive"></i>
            </button>
          </th>
          <th>
            <button id="delete-table-all-notes" title="Delete All">
              <i className="fa-solid fa-trash"></i>
            </button>
          </th>
        </tr>
      </thead>

      <NoteRows />

      <tfoot>
        {formStatus ? <NoteForm /> : !tableArchiveStatus ? <CreateNoteButton /> : ""}
      </tfoot>
    </table>

  )
}

export function CreateNoteButton() {
  const dispatch = useAppDispatch();
  return (
    <tr>
      <button id="create-note-button" className="outside"
        onClick={() => dispatch(showCreateForm())}>
        Create Note
      </button>
    </tr>
  )
}

export function TableStatusButton() {
  const dispatch = useAppDispatch();
  return (
    <button id="swap-table-status" className="outside"
      onClick={() => dispatch(switchTableArchiveStatus())}>
      Show Archived Notes
    </button>
  )
}

export function StatsTable() {
  const notes = useAppSelector(state => state.notes.notesList)
  const categories = useAppSelector(state => state.notes.categoriesList)

  return (
    <table id="stats">
      <thead>
        <tr> <th></th> <th>Note Category</th> <th>Active</th> <th>Archived</th> </tr>
      </thead>
      <tbody>
        {categories.map((category) => {
          return (<CategoryStatsRow {...getCategoryStats(notes, category)} />)
        })}
      </tbody>
    </table>
  )
}


// function getCategoryStats(notes: NoteData[], category: Category) {
//   let categoryStats = { category: category, active: 0, archived: 0 }
//   notes.forEach(note => {
//     if (note.category.categoryName == category.categoryName) {
//       if (note.archivedStatus) {
//         categoryStats.archived++
//       } else {
//         categoryStats.active++
//       }
//     }
//   })
//   return categoryStats
// }

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
  //let note = prop.note

    return (
      <tr>
        <td><CategoryIcon {...note.category} /></td>
        <td>{note.name}</td>
        <td>{noteService.formatDate(note.createDate)}</td>
        <td>{note.category.categoryName}</td>
        <td>{note.content}</td>
        <td>{noteService.extractDates(note)}</td>
        <td>
          <button className="edit-note-button" title="Edit Note"
            onClick={() => dispatch(edit(note.id))}>
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
          return (<SingleNote {...note}/>)
        })
      }
    </tbody>
  )
}

function NoteForm() {
  const dispatch = useAppDispatch();
  let dates = ""
  let createDate = ""

  const [name, setName] = useState("")
  const [categoryName, setCategoryName] = useState(useAppSelector(state => {
    return state.notes.categoriesList[0].categoryName}))
  const [content, setContent] = useState("")

  return (
    <tr id="new-note">
      <td><form id="note-form"></form></td>
      <td>
        <input form="note-form" type="text" id="name" name="name" autoComplete="off"
          value={name}
          onChange={(e) => { setName(e.target.value) }} />
      </td>
      <td>{createDate}</td>
      <td>
        <select name="category" form="note-form"
          value={categoryName}
          onChange={(e) => { setCategoryName(e.target.value) }}>
          <CategoryOptions />
        </select>
      </td>
      <td>
        <input form="note-form" type="text" name="content" autoComplete="off"
          value={content}
          onChange={(e) => { setContent(e.target.value) }} />
      </td>
      <td>{dates}</td>
      <td>
        <button form="note-form" type="button" className="add" title="Save Note"
          onClick={() => dispatch(add({ name: name, categoryName: categoryName, content: content }))}>
          <i className="fa-solid fa-check"></i>
        </button>
      </td>
      <td>
        <button form="note-form" type="button" title="Discard Changes"
          onClick={() => dispatch(hideCreateForm())}>
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
      {categories.map((category) => {
        return(<option value={category.categoryName}>{category.categoryName}</option>)
      })}
    </>
  )
}


// export function Counter() {
//   const count = useAppSelector(selectCount);
//   const dispatch = useAppDispatch();
//   const [incrementAmount, setIncrementAmount] = useState('2');

//   const incrementValue = Number(incrementAmount) || 0;

//   return (
//     <div>
//       <div className={styles.row}>
//         <button
//           className={styles.button}
//           aria-label="Decrement value"
//           onClick={() => dispatch(decrement())}
//         >
//           -
//         </button>
//         <span className={styles.value}>{count}</span>
//         <button
//           className={styles.button}
//           aria-label="Increment value"
//           onClick={() => dispatch(increment())}
//         >
//           +
//         </button>
//       </div>
//       <div className={styles.row}>
//         <input
//           className={styles.textbox}
//           aria-label="Set increment amount"
//           value={incrementAmount}
//           onChange={(e) => setIncrementAmount(e.target.value)}
//         />
//         <button
//           className={styles.button}
//           onClick={() => dispatch(incrementByAmount(incrementValue))}
//         >
//           Add Amount
//         </button>
//         <button
//           className={styles.asyncButton}
//           onClick={() => dispatch(incrementAsync(incrementValue))}
//         >
//           Add Async
//         </button>
//         <button
//           className={styles.button}
//           onClick={() => dispatch(incrementIfOdd(incrementValue))}
//         >
//           Add If Odd
//         </button>
//       </div>
//     </div>
//   );
// }