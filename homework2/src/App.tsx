import React from 'react';

import { NotesTable, StatsTable, CreateNoteButton, TableArchiveStatusButton } from './features/note/NotesTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        {/* <Counter /> */}
        <NotesTable />
        
        <StatsTable />
        <TableArchiveStatusButton />
        
      </header>
    </div>
  );
}

export default App;
