"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
class Note {
    constructor(data) {
        this.id = -1;
        this.title = data.title;
        this.createDate = new Date();
        this.content = data.content;
        this.archiveStatus = false;
        this.categoryId = data.categoryId;
        this.cleanUp();
    }
    // create() {
    //   return new Promise<void>((resolve, reject) => {
    //     this.cleanUp()
    //     this.validate()
    //     if (!this.errors.length) {
    //       resolve()
    //       // noteRpository.insertOne(this.data).then(() => {
    //       //   resolve()
    //       // }).catch(() => {
    //       //   this.errors.push("please try again later")
    //       //   reject(this.errors)
    //       // })
    //     } else {
    //       reject(this.errors)
    //     }
    //   })
    // }
    cleanUp() {
        this.title = this.title.trim();
        this.content = this.content.trim();
    }
    validate() {
        let errors = [];
        if (this.title === "") {
            errors.push("Note title is required.");
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
        if (this.content === "") {
            errors.push("Note content is required.");
        }
        return errors;
    }
}
exports.Note = Note;
//# sourceMappingURL=Note.js.map