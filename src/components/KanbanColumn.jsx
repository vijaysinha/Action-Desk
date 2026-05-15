import KanbanCard from "./KanbanCard";
import useBoardStore from "../store/useBoardStore";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";


function KanbanColumn() {
  const columns = useBoardStore((state) => state.columns);
  const addCard = useBoardStore((state) => state.addCard);
  const [newTitle, setNewTitle] = useState("");
  const [newCard, setNewCard] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);

  const handleAddCard = (colId) => {
    addCard(colId, newTitle);
    setNewTitle("");
  };

  function Column({ columnId, column }) {
    const { setNodeRef } = useDroppable({
      id: columnId,
      data: { type: "column", columnId },
    });

    return (
      <div
        ref={setNodeRef}
        className={`column-container bg-zinc-900/20 border border-zinc-700 rounded-lg p-3 flex flex-col ${newCard ? "blur-xs" : ""} ${columnId === "backlog" ? "border-r-red-500/70 border-r-4" :""} `}
      >
        {/* Header */}
        <div className="column-header flex items-center justify-between mb-2">
          <h2 className="text-zinc-300 font-semibold">{column.title}</h2>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900 text-zinc-300 text-sm border border-zinc-700">
            {column?.cards.length}
          </span>
        </div>

        {/* Cards */}
        <div className="card-list flex flex-col gap-2">
          {column.cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              cardId={card.id}
              columnId={columnId}
            />
          ))}
        </div>
        {columnId === "backlog" && (
          <div className="card-drag bg-zinc-800 border border-dashed border-zinc-600  p-3 rounded-md mb-2">
            <div className="card-drag-inside bg-zinc-800  relative">
              <p className="bg-zinc-900/50 text-right text-sm text-zinc-500 pr-2 flex items-center gap-2 justify-center rounded-md">
                <span className=" text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    fill="currentColor"
                  >
                    <path d="M22.0003 13.0001L22.0004 11.0002L5.82845 11.0002L9.77817 7.05044L8.36396 5.63623L2 12.0002L8.36396 18.3642L9.77817 16.9499L5.8284 13.0002L22.0003 13.0001Z"></path>
                  </svg>
                </span>{" "}
                drag cards here
              </p>
            </div>
          </div>
        )}
        <div className="card-add bg-zinc-800 border border-dashed border-zinc-600 cursor-pointer p-3 rounded-md">
          <p
            onClick={() => {
              setSelectedColumnId(columnId);
              setNewCard(true);
            }}
            className="flex items-center justify-center gap-2 text-zinc-400"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="currentColor"
              >
                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
              </svg>
            </span>
            Add Card
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="kanban-board relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
      {Object.keys(columns).map((columnId) => (
        <Column key={columnId} columnId={columnId} column={columns[columnId]} />
      ))}

      {/* this is the new card title entry box */}
      {newCard ? (
        <motion.div
          className="new-card-container w-full min-h-[33%] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-md p-4 bg-zinc-800 flex items-center shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
        >
          <div className="new-card-form z-99 w-full bg-zinc-800 ">
            <input
              type="text"
              value={newTitle}
              placeholder="Title here..."
              onChange={(e) => setNewTitle(e.target.value)}
              required
              className="border w-full h-auto border-zinc-700 p-2 rounded-md focus:outline-none text-sm text-zinc-400"
            />
            <button
              type="button"
              onClick={() => {
                if (selectedColumnId) {
                  handleAddCard(selectedColumnId);
                }
                setNewCard(false);
              }}
              className="border border-zinc-700 text-sm text-zinc-400 px-4 py-2 rounded-md mt-2 hover:bg-zinc-700/50 transition-colors m-auto block"
            >
              Submit
            </button>
          </div>
        </motion.div>
      ) : null}
    </section>
  );
}

export default KanbanColumn;
