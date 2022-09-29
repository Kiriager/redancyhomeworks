"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
class Note {
    constructor(formData) {
        let data = this.extractFormData(formData);
        this.id = -1;
        this.title = data.title;
        this.createDate = new Date();
        this.content = data.content;
        this.archiveStatus = false;
        this.categoryId = data.categoryId;
        this.cleanUp();
    }
    cleanUp() {
        this.title = this.title.trim();
        this.content = this.content.trim();
    }
    extractFormData(data) {
        let formData = {
            title: "",
            content: "",
            categoryId: -1
        };
        if (typeof (data.title) == "string") {
            formData.title = data.title;
        }
        if (typeof (data.content) == "string") {
            formData.content = data.content;
        }
        if (typeof (data.categoryId) == "number") {
            formData.categoryId = data.categoryId;
        }
        return formData;
    }
}
exports.Note = Note;
//# sourceMappingURL=Note.js.map