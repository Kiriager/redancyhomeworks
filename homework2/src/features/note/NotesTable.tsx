import React, { useState } from 'react';
import { CategoryStats, NoteData, Category } from "./notesSlice";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
//   selectCount,
// } from './counterSlice';

import styles from './Note.module.css';
import notesSlice from './notesSlice';

export function NotesTable() {

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
              <i className="fa-solid fa-box-archive">Archive All</i>
            </button>
          </th>
          <th>
            <button id="delete-table-all-notes" title="Delete All">
              <i className="fa-solid fa-trash">Delete All</i>
            </button>
          </th>
        </tr>
      </thead>

      <NoteRows />

      <tfoot><tr id="new-note"></tr></tfoot>
    </table>

    // <button id="create-note-button" className="outside">Create Note</button>



    // <button id="swap-table-status" className="outside">Show Archived Notes</button>
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


function getCategoryStats(notes: NoteData[], category: Category) {
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

function CategoryStatsRow(categoryStats: CategoryStats) {
  return (
    <tr>
      <td><CategoryIcon {...categoryStats.category}/></td>
      <td>{categoryStats.category.categoryName}</td>
      <td>{categoryStats.active}</td>
      <td>{categoryStats.archived}</td>
    </tr>
  )
}

function CategoryIcon(category: Category) {
  return (
    <div className="task-icon-container">
      <i className={category.categoryIcon}>{category.categoryIcon}</i>
    </div>
  )
}

function SingleNote(note: NoteData) {
  return (
    <tr>
      <td><CategoryIcon {...note.category}/></td>
      <td>{note.name}</td>
      <td>{formatDate(note.createDate)}</td>
      <td>{note.category.categoryName}</td>
      <td>{note.content}</td>
      <td>{stringifyDatesList(extractDates(note.content, note.name))}</td>
      <td><button className="edit-note-button" title="Edit Note"><i className="fa-solid fa-pen-to-square">edit</i></button></td>
      <td><button className="archive-note-button" title="Archive/Unarchive Note"><i className="fa-solid fa-box-archive">archive</i></button></td>
      <td><button className="delete-note-button" title="Delete Note"><i className="fa-solid fa-trash">delete</i></button></td>
    </tr>
  )
}

function NoteRows() {
  const notes = useAppSelector(state => state.notes.notesList)
  return (
    <tbody>
      {notes.map(note => {
        return (<SingleNote {...note} />)
      })
      }
    </tbody>
  )
}

// function createFormRowHTML(note) {
//   let dates = ""
//   let createDate = ""

//   if (typeof(note) != "undefined") {
//     createDate = getFormateDate(note.data.createDate)
//     dates = getDatesList(note.getDates())
//   }

//   return `
//     <td></td>
//     <td><input type="text" id="name" name="name" autocomplete="off" form="note-form"></td>
//     <td>${createDate}</td>
//     <td><select form="note-form" name="category" id="category"></select></td>
//     <td><input form="note-form" type="text" id="content" name="content" autocomplete="off"></td>
//     <td>${dates}</td>
//     <td><button form="note-form" type="button" class="add" id="submit-note-form" title="Save Note"><i class="fa-solid fa-check"></i></button></td>
//     <td><button form="note-form" type="button" id="discard-note-form" title="Discard Changes"><i class="fa-solid fa-xmark"></i></button></td>
//     <td></td>
//   `
// }

function formatDate(date: Date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

function extractDates(content: string, name: string) {
  let stringDates = (content + name).match(/[0-9]{1,2}([\-/ \.])[0-9]{1,2}[\-/ \.][0-9]{4}/g)
  if (stringDates == null) {
    return new Array<Date>
  }
  let dates = stringDates.map((date) => {
    return convertStringToDate(date)
  })
  return dates
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

function stringifyDatesList(dates: Date[] | null) {
  if (dates == null || !dates.length) {
    return ""
  }
  return dates.map((date) => {
    return formatDate(date)
  }).join(", ")
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