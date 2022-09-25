"use strict";
const db_1 = require("../db");
class CategoryRepository {
    constructor() { }
    findAll() {
        return db_1.db.categoriesCollection;
    }
}
module.exports = new CategoryRepository();
//# sourceMappingURL=CategoryRepository.js.map