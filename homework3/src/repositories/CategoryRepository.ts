import { db } from "../db"
import { Category } from "../models/Category"

class CategoryRepository {
  constructor() {}
  findAll():Category[] {
    return db.categoriesCollection
  }
}

export = new CategoryRepository()
