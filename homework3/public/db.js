const categories = ["Task", "Idea", "Random Thought"]

const categoriesIcons = ["thumbtack", "lightbulb", "thought-bubble"]

const cats = [
    {title: "Task", icon: "fa-solid fa-thumbtack"}, 
    {title: "Idea", icon: "fa-solid fa-gears"}, 
    {title: "Random Thought", icon: "fa-solid fa-lightbulb"}
]

export let db = {
    //cats: cats,
    categories: cats,
    categoriesIcons: categoriesIcons,
    notes: [],
    sessionData: {
        archiveTableStatus: false,
        editNoteId: -1
    }
}

