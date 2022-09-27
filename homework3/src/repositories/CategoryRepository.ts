import { db } from "../db"
import { Category } from "../models/Category"

class CategoryRepository {
  constructor() {}
  findAll():Promise<Category[]> {
    return new Promise((resolve, reject) => {
      resolve(db.categoriesCollection)
    })
  }

  findOneById(id: number):Promise<Category> {
    return new Promise((resolve, reject) => {
      let category = db.categoriesCollection.find((category) => {return category.id === id})
      if (!category) {
        reject("Category doesn't exist.")
      } else {
        resolve(category)
      }
    })
  }

  // ifCategoryExists(id: number): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     let category = db.categoriesCollection.find((category) => {return category.id === id})
  //     if (!category) {
  //       reject("Category doesn't exist.")
  //     } else {
  //       resolve(true)
  //     }
  //   })
  // }
}

export = new CategoryRepository()
