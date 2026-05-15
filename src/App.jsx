import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <>
      <div className="main flex flex-col items-center justify-start min-h-screen w-full bg-zinc-900 text-zinc-300 p-4 gap-4">
        <h1 className="text-2xl font-medium font-heading">Action Desk</h1>
        <Board />
      </div>
    </>
  );
}

export default App;
