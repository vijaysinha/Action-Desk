import {create} from 'zustand'
import {persist} from 'zustand/middleware'
const boardStore = (set) => ({
    columns: {
        backlog:     { id: 'backlog',     title: 'Backlog',      cards: [] },
        inProgress:  { id: 'inProgress',  title: 'In Progress',  cards: [] },
        review:      { id: 'review',      title: 'Review',       cards: [] },
        done:        { id: 'done',        title: 'Done',         cards: [] },
      },

      addCard:(columnId,title )=> set((state)=>{
       if((title.trim())===""){
        return state
       }
       return {
        columns:{
            ...state.columns,
            [columnId]:{
                ...state.columns[columnId],
                cards:[...state.columns[columnId].cards, 
                {id:crypto.randomUUID(), title:title, createdAt:Date.now()}]
            }
            }
      }}),

      deleteCard:(columnId, cardId)=> set((state)=>(
        {
        columns:{
            ...state.columns,
            [columnId]:{
                ...state.columns[columnId],
                cards: state.columns[columnId].cards.filter(c => c.id !== cardId)
            }
        }
      })),
      editCard:(columnId, cardId, newTitle)=> set((state)=>(
        {
        columns:{
            ...state.columns,
            [columnId]:{
                ...state.columns[columnId],
                cards: state.columns[columnId].cards.map((c)=>(c.id === cardId) ? {...c, title: newTitle} : c)
            }
        }
      })),

      moveCard:(fromColumnId, toColumnId, cardId)=> set((state)=>{
        const card = state.columns?.[fromColumnId]?.cards.find(c => c.id === cardId);
        if (!card || !state.columns?.[toColumnId]) return state;
        if (fromColumnId === toColumnId) return state;

        return {
            columns:{
                ...state.columns,
                [fromColumnId]:{
                    ...state.columns[fromColumnId],
                    cards: state.columns[fromColumnId].cards.filter(c=> c.id !== cardId)
                },
                [toColumnId]:{
                    ...state.columns[toColumnId],
                    cards:[...state.columns[toColumnId].cards, card]
                }
            }
        }
      }),
    
})

const useBoardStore = create(
    persist(
        boardStore,
        { name: 'kanban-board' }  // localStorage key
    )
)
export default useBoardStore