import Note from "./Note.js"

export let categories = ["Task", "Idea", "Random Thought"]

export let notesList = [
  new Note({name: "buy books", createDate: new Date(), category: "Task",
      content: "buy some books", archived: false}),
  new Note({name: "buy more books", createDate: new Date(), category: "Idea", 
      content: "buy some more books", archived: false}),
  new Note({name: "sell books", createDate: new Date(), category: "Random Thought",
      content: "sell some books", archived: true}),
  new Note({name: "read books", createDate: new Date(), category: "Task",
      content: "read some books", archived: false})
]



