import{ useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { columnsFromBackend } from './KanbanData';

import TaskCard from './TaskCard';

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const [dragState, setDragState] = useState({
    dragging: false,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
  });

  const cardRef = useRef(null);

  const onDragStart = (e) => {
    // Prevent right-click behavior on touch devices
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
  };

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

  const onTouchStart = (e, draggableProps) => {
    const touch = e.touches[0];

    // Store the initial touch position
    setDragState((prevState) => ({
      ...prevState,
      dragging: true,
      initialX: touch.clientX,
      initialY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
    }));

    // Add event listeners to handle touch movement and end events
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    // Call the provided draggableProps onStart method to initialize dragging
    draggableProps.onStart(e);
  };

  const onTouchMove = (e) => {
    if (!dragState.dragging) return;

    const touch = e.touches[0];

    // Calculate the distance moved by the touch
    const deltaX = touch.clientX - dragState.initialX;
    const deltaY = touch.clientY - dragState.initialY;

    // Update the current touch position
    setDragState((prevState) => ({
      ...prevState,
      currentX: touch.clientX,
      currentY: touch.clientY,
    }));

    // Adjust the card position accordingly
    cardRef.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
  };

  const onTouchEnd = () => {
    if (!dragState.dragging) return;

    // Reset the drag state and remove the event listeners
    setDragState((prevState) => ({
      ...prevState,
      dragging: false,
      initialX: 0,
      initialY: 0,
      currentX: 0,
      currentY: 0,
    }));

    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);

    // Reset the card position
    cardRef.current.style.transform = '';
  };

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col m-3 sm:flex-row">
        {Object.entries(columns).map(([columnId, column]) => (
          <div className="flex flex-col w-{90%} sm:w-full h-full bg-neutral-100 rounded-lg p-4 m-4" key={columnId}>
            <div className="flex items-center justify-between">
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
                >
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onTouchStart={(e) => onTouchStart(e, provided.dragHandleProps)}
                          className={`bg-white shadow-md  rounded-lg ${
                            snapshot.isDragging ? 'opacity-70' : ''
                          }`}
                          style={{ ...provided.draggableProps.style }}
                        >
                          <TaskCard
                            item={item}
                            index={index}
                            columnId={columnId}
                            ref={cardRef}
                          />
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
