const categories = ["Task", "Idea", "Random Thought"]

export let db = {
    categories: categories,
    notes: [],
    sessionData: {
        archiveTableStatus: false,
        editNoteId: -1
    }
}

