import React, { useState } from "react";
import useBoardStore from "../store/useBoardStore";
import { useDraggable } from "@dnd-kit/core";

function KanbanCard({ card, cardId, columnId }) {
const isDone = columnId === "done";

  const editCard = useBoardStore((state) => state.editCard);
  const deleteCard = useBoardStore((state) => state.deleteCard);

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(card.title);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: cardId,
    data: {
      type: "card",
      cardId,
      columnId,
    },
  });
  const updateCard = () => {
    editCard(columnId, cardId, title);
    setIsEdit(false);
  };

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
  return (
    <>
      {isEdit ? (
        <div className="new-card cursor-grab relative bg-zinc-800 border border-zinc-700 rounded-lg p-4 mb-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-yellow-200 p-2 rounded-md mr-2 outline-none w-full bg-zinc-900/20"
          />
          <button
            onClick={updateCard}
            className="text-sm border border-zinc-700 p-2 rounded-md cursor-pointer"
          >
            Update
          </button>
        </div>
      ) : (
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          className={`card-container cursor-grab relative bg-zinc-800 border border-zinc-700 rounded-lg p-4 mb-2 ${isDone ? "opacity-50" : ""}  `}
        >
          <h1 className={`text-sm font-light ${isDone ? "opacity-70 line-through text-zinc-300" : ""}`}>{card.title}</h1>
          <div className="card-btn flex gap-4 justify-end flex-row">
            <button
              className="text-zinc-500 text-sm  cursor-pointer"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setIsEdit(true)}
            >
              edit
            </button>
            <button
              className="text-red-300 text-sm  cursor-pointer"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => deleteCard(columnId, cardId)}
            >
              delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default KanbanCard;
