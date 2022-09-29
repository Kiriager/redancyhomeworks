export class Note {
  id: number
  title: string
  createDate: Date
  content: string
  archiveStatus: boolean
  categoryId: number

  constructor(formData: any) {
    let data = this.extractFormData(formData)
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

  private extractFormData(data: any):NoteFormData {
    let formData = {
      title: "",
      content: "",
      categoryId: -1
    }
    if (typeof(data.title) == "string") {
      formData.title = data.title
    }
    if (typeof(data.content) == "string") {
      formData.content = data.content
    }
    if (typeof(data.categoryId) == "number") {
      formData.categoryId = data.categoryId
    }
    return formData
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