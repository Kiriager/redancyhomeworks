import { NotesTable, StatsTable, TableArchiveStatusButton } from './features/note/NotesTables';
// import './App.css';

function App() {
  return (
    <div className="App m-[5%]">
      <NotesTable />
      <StatsTable />
      <TableArchiveStatusButton />
    </div>
  );
}

export default App;
