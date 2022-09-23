"use strict";
//import express from 'express'
const express = require('express');
const app = express();
const router = require('./routes/router');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(express.static('public'))
//app.set('views', 'views')
app.use('/', router);
module.exports = app;
// class App {
//   public express
//   constructor () {
//     this.express = express()
//     this.mountRoutes()
//   }
//   private mountRoutes (): void {
//     const router = express.Router()
//     router.get('/', (req, res) => {
//       res.json({
//         message: 'Hello World!'
//       })
//     })
//     this.express.use('/', router)
//   }
// }
// export default new App().express
//# sourceMappingURL=App.js.map