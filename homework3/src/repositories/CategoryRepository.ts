import { db } from "../db"
import { Category } from "../models/Category"

class CategoryRepository {
  constructor() {}
  findAll():Promise<Category[]> {
    return new Promise((resolve, reject) => {
      resolve(db.categoriesCollection)
    })
  }

  findOneById(id: number) {
    return new Promise((resolve, reject) => {
      let category = db.categoriesCollection.find((category) => {return category.id === id})
      if (typeof(category) == 'undefined') {
        resolve(category)
      } else {
        reject("Category doesn't exist.")
      }
    })
  }
}

export = new CategoryRepository()
