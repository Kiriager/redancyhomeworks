import React from 'react';

import { Counter } from './features/counter/Counter';
import { NotesTable, StatsTable } from './features/note/NotesTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        {/* <Counter /> */}
        <NotesTable />
        <StatsTable />
        
      </header>
    </div>
  );
}

export default App;
