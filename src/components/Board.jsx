import useBoardStore from "../store/useBoardStore";
import KanbanColumn from "./KanbanColumn";
import { DndContext,DragOverlay } from "@dnd-kit/core";
import { useState } from "react";

export default function Board() {
  const [activeCard, setActiveCard] = useState(null);

  const columns = useBoardStore((state) => state.columns);
  function handleDragStart(event) {
    const { active } = event;
    const { cardId, columnId } = active.data.current || {};
    if (cardId && columnId) {
      setActiveCard({ cardId, columnId });
    } else {
      setActiveCard(null);
    } 
  }
  const moveCard = useBoardStore((state)=> state.moveCard)
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const fromColumnId = active.data.current?.columnId;
    const toColumnId = over.data?.current?.columnId ?? over.id;
    const cardId = active.id;

    if (!fromColumnId || !toColumnId) return;
    moveCard(fromColumnId, toColumnId, cardId);
  }

  
  return (
    <>
      <div className="board-container flex gap-4 w-full items-center justify-center flex-wrap mt-2 ">
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <KanbanColumn />
        </DndContext>
      </div>
    </>
  );
}
