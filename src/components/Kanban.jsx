import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { columnsFromBackend } from './KanbanData';
import { TouchBackend } from 'react-dnd-touch-backend'
import TaskCard from './TaskCard';

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reorder items within the same column
      const column = columns[source.droppableId];
      const items = Array.from(column.items);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      const updatedColumn = {
        ...column,
        items: items,
      };

      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: updatedColumn,
      }));
    } else {
      // Move items between columns
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [movedItem] = sourceItems.splice(source.index, 1);

      if (destination.droppableId === 'completed') {
        // Moving to the "completed" column, update the priority to "Completed"
        movedItem.priority = 'Completed';
      }

      destItems.splice(destination.index, 0, movedItem);

      const updatedSourceColumn = {
        ...sourceColumn,
        items: sourceItems,
      };

      const updatedDestColumn = {
        ...destColumn,
        items: destItems,
      };

      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: updatedSourceColumn,
        [destination.droppableId]: updatedDestColumn,
      }));
    }
  };
  useEffect(() => {
    // Apply touch backend options for mobile devices
    if ('ontouchstart' in window) {
      TouchBackend({ enableMouseEvents: true });
    }
  }, []);

  const renderAdd = (columnId) => {
    if (columnId === 'todo') {
      return (
        <div className="flex justify-end">
          <button className="text-indigo-600 bg-indigo-300 rounded-lg w-6 h-6">+</button>
        </div>
      );
    } else {
      return null;
    }
  };

  const getBulletColor = (columnId) => {
    switch (columnId) {
      case 'todo':
        return 'blue';
      case 'inProgress':
        return 'orange';
      case 'completed':
        return 'lightblue';
      default:
        return 'blue';
    }
  };

  const getHrColor = (columnId) => {
    switch (columnId) {
      case 'todo':
        return 'darkblue';
      case 'inProgress':
        return 'orange';
      case 'completed':
        return 'green';
      default:
        return 'darkblue';
    }
  };

  // const addNewTask = (columnId) => {
  //   const newItem = {
  //     id: uuidv4(),
  //     heading: 'New Task',
  //     priority: 'Low',
  //   };

  //   const updatedColumn = {
  //     ...columns[columnId],
  //     items: [...columns[columnId].items, newItem],
  //   };

  //   setColumns((prevColumns) => ({
  //     ...prevColumns,
  //     [columnId]: updatedColumn,
  //   }));
  // };

  return (
    <DragDropContext onDragEnd={onDragEnd} backend={TouchBackend}>
      <div className="flex flex-col m-7 sm:flex-row">
        {Object.entries(columns).map(([columnId, column]) => (
          <div className="flex flex-col w-{90%} sm:w-full h-full bg-neutral-100 rounded-lg p-4 m-4" key={columnId}>
            <div className="flex  items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: getBulletColor(columnId) }}
                ></div>
                <h2 className="text-lg font-semibold flex items-center">
                  {column.title}
                  <span className="flex bord_5 ml-2 p-3 text-sm">{column.items.length}</span>
                </h2>
              </div>
              {renderAdd(columnId)}
            </div>
            <hr
              className="h-2"
              style={{
                borderTop: `2px solid ${getHrColor(columnId)}`,
                margin: '8px 0',
              }}
            />
            <Droppable droppableId={columnId} direction="vertical" isCombineEnabled={true}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-4"
                  onTouchMove={(event) => {
                    // Prevent scrolling when dragging on mobile devices
                    event.stopPropagation();
                  }}
                >
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onTouchStart={(event) => {
                            // Prevent scrolling when touching the draggable item on mobile devices
                            event.stopPropagation();
                          }}
                        >
                          <TaskCard id={item.id} item={item} isDropDisabled={columnId === 'completed'} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Kanban;
