"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
function start() {
    const app = require('./App');
    app.listen(process.env.PORT);
}
start();
//# sourceMappingURL=launch.js.map