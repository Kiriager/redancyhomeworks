import noteRpository = require("../repositories/NoteRepository")
import Category = require("./Category")

export class Note {
  
  data: NoteData
  errors: string[]

  constructor(data: NoteFormData) {
    this.errors = []
    this.data = {
      id: -1,
      title: data.title,
      createDate: new Date(),
      content: data.content,
      archiveStatus: false,
      categoryId: data.categoryId
    }
  }

  create() {
    return new Promise<void>((resolve, reject) => {
      this.cleanUp()
      this.validate()
      if (!this.errors.length) {
        resolve()
        // noteRpository.insertOne(this.data).then(() => {
        //   resolve()
        // }).catch(() => {
        //   this.errors.push("please try again later")
        //   reject(this.errors)
        // })
      } else {
        reject(this.errors)
      }
    })
  }

  cleanUp() {
    this.data.title = this.data.title.trim()
    this.data.content = this.data.content.trim()
  }

  validate() {
    let errors = []
    if (this.data.title === "") {
      errors.push("Note title is required.")
    }
    // if (note.category.categoryName === "") {
    //   errors.push("Note category is required.")
    // }
    // let category = categories.find((category) => {
    //   return note.category.categoryName === category.categoryName
    // })
    // if (!category) {
    //   errors.push("Category has to be one of the list.")
    // } else {
    //   note.category = category
    // }
    if (this.data.content === "") {
      errors.push("Note content is required.")
    }
    return errors
  }

}

interface NoteFormData {
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

interface NoteDto {
  note: NoteData,
  datesList: Date[],
}