export interface Category {
  id: number,
  categoryName: string,
  categoryIcon: string
}

export interface CategoryStats {
  category: Category,
  active: number,
  archived: number
}