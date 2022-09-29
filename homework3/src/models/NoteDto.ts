import { Category } from "./Category"

export interface NoteDto {
  id: number
  title: string
  createDate: Date
  content: string
  archiveStatus: boolean
  category: Category,
  datesList: Date[]
}
