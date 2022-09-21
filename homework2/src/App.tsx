import { NotesTable, StatsTable, TableArchiveStatusButton } from './features/note/NotesTables';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NotesTable />
        <StatsTable />
        <TableArchiveStatusButton />
      </header>
    </div>
  );
}

export default App;
