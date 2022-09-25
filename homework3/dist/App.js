"use strict";
//import express from 'express'
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const router = require("./routes/router");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);
module.exports = app;
//# sourceMappingURL=app.js.map