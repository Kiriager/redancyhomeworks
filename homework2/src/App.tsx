import { NotesTable, StatsTable, TableArchiveStatusButton } from './features/note/NotesTables';

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
