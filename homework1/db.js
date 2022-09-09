const Note = require('./models/Note')

let db = [
  new Note({name: "buy books", created: "date", category: "Task",
      content: "buy some books", archived: false}),
  new Note({name: "buy more books", created: "date", category: "Task", 
      content: "buy some more books", archived: false}),
  new Note({name: "sell books", created: "date", category: "Task",
      content: "sell some books", archived: true})
]

module.exports = db