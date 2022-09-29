"use strict";
const db_1 = require("../db");
class CategoryRepository {
    constructor() { }
    findAll() {
        return new Promise((resolve, reject) => {
            resolve(db_1.db.categoriesCollection);
        });
    }
    findOneById(id) {
        return new Promise((resolve, reject) => {
            let category = db_1.db.categoriesCollection.find((category) => { return category.id === id; });
            if (!category) {
                reject("Category doesn't exist.");
            }
            else {
                resolve(category);
            }
        });
    }
}
module.exports = new CategoryRepository();
//# sourceMappingURL=CategoryRepository.js.map