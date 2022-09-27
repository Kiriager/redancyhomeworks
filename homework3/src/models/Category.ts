import CategoryRepository from "../repositories/CategoryRepository"

export interface Category {
  id: number,
  categoryName: string,
  categoryIcon: string
}

export function findOneById(id: number): Promise<Category> {
  return new Promise((resolve, reject) => {
    CategoryRepository.findOneById(id).then((category) => {
      resolve(category)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function findAll(): Promise<Category[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await CategoryRepository.findAll()
      resolve(categories)
    } catch (error) {
      reject(error)
    }
  })

}