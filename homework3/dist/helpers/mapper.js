"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDto = void 0;
function toDto(note, category) {
    return {
        id: note.id,
        title: note.title,
        createDate: note.createDate,
        archiveStatus: note.archiveStatus,
        content: note.content,
        category: category,
        datesList: extractDates(note)
    };
}
exports.toDto = toDto;
function extractDates(note) {
    let stringDates = (note.content
        + note.title).match(/[0-9]{1,2}([\-/ \.])[0-9]{1,2}[\-/ \.][0-9]{4}/g);
    if (stringDates == null) {
        return [];
    }
    let dates = stringDates.map((date) => {
        return convertStringToDate(date);
    });
    return dates;
}
function formatDateNumbers(numbers) {
    let month = numbers[1];
    let day = numbers[0];
    if (month > 12) {
        month = numbers[0];
        day = numbers[1];
    }
    const result = [numbers[2], month - 1, day];
    return result;
}
function convertStringToDate(stringDate) {
    let stringDayMonthYear = stringDate.match(/\d+/g);
    if (stringDayMonthYear == null) {
        return new Date();
    }
    let numberDayMonthYear = stringDayMonthYear.map((value) => { return parseInt(value); });
    return new Date(...formatDateNumbers(numberDayMonthYear));
}
//# sourceMappingURL=mapper.js.map