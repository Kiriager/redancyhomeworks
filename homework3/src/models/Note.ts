import noteRpository = require("../repositories/NoteRepository")
import Category = require("./Category")

export class Note {
  id: number
  title: string
  createDate: Date
  content: string
  archiveStatus: boolean
  categoryId: number

  constructor(data: NoteFormData) {
    this.id = -1
    this.title = data.title
    this.createDate = new Date()
    this.content = data.content
    this.archiveStatus = false
    this.categoryId = data.categoryId
    this.cleanUp()
  }

  cleanUp() {
    this.title = this.title.trim()
    this.content = this.content.trim()
  }

}

export interface NoteFormData {
  title: string
  content: string
  categoryId: number
}

export interface NoteData {
  id: number
  title: string
  createDate: Date
  content: string
  archiveStatus: boolean
  categoryId: number
}