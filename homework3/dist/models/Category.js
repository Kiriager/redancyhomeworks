"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.findOneById = void 0;
const CategoryRepository_1 = __importDefault(require("../repositories/CategoryRepository"));
function findOneById(id) {
    return new Promise((resolve, reject) => {
        CategoryRepository_1.default.findOneById(id).then((category) => {
            resolve(category);
        }).catch((error) => {
            reject(error);
        });
    });
}
exports.findOneById = findOneById;
function findAll() {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let categories = yield CategoryRepository_1.default.findAll();
            resolve(categories);
        }
        catch (error) {
            reject(error);
        }
    }));
}
exports.findAll = findAll;
//# sourceMappingURL=Category.js.map