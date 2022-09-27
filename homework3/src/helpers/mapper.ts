import { Category } from "../models/Category";
import { NoteData } from "../models/Note";


export function toDto (note: NoteData, category: Category):NoteDto {
  return {
    id: note.id,
    title: note.title,
    createDate: note.createDate,
    archiveStatus: note.archiveStatus,
    content: note.content,
    category: category,
    datesList: extractDates(note)
  }
}

interface NoteDto {
  id: number
  title: string
  createDate: Date
  content: string
  archiveStatus: boolean
  category: Category,
  datesList: Date[]
}

function convertStringToDate(stringDate: string) {
  let stringDayMonthYear = stringDate.match(/\d+/g)
  if (stringDayMonthYear == null) {
    return new Date()
  }
  let numberDayMonthYear = stringDayMonthYear.map((value) => { return parseInt(value) })
  return new Date(...formatDateNumbers(numberDayMonthYear))
}

// function stringifyDatesList(dates: Date[]) {
//   if (dates == null || !dates.length) {
//     return ""
//   }
//   return dates.map((date) => {
//     return formatDate(date)
//   }).join(", ")
// }

// function formatDate(date: Date) {
//   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
// }

function extractDates(note: NoteData): Date[] {
  let stringDates = (note.content 
      + note.title).match(/[0-9]{1,2}([\-/ \.])[0-9]{1,2}[\-/ \.][0-9]{4}/g)
  if (stringDates == null) {
    return []
  }
  let dates = stringDates.map((date) => {
    return convertStringToDate(date)
  })
  return dates
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