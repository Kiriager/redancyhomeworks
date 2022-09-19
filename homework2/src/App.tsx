import React from 'react';

import { NotesTable, StatsTable, CreateNoteButton, TableStatusButton } from './features/note/NotesTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        {/* <Counter /> */}
        <NotesTable />
        <CreateNoteButton />
        <StatsTable />
        <TableStatusButton />
        
      </header>
    </div>
  );
}

export default App;
