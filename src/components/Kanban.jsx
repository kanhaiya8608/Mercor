import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { columnsFromBackend } from './KanbanData';

import TaskCard from './TaskCard';

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
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
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [removedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removedItem);

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

  const addNewTask = (columnId) => {
    const newItem = {
      id: uuidv4(),
      title: 'New Task',
      priority: 'low',
    };

    const updatedColumn = {
      ...columns[columnId],
      items: [...columns[columnId].items, newItem],
    };

    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: updatedColumn,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col sm:flex-row">
        {Object.entries(columns).map(([columnId, column]) => (
          <div className="flex flex-col w-80 h-full bg-neutral-100 rounded-lg p-4 m-4" key={columnId}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-5 h-5 rounded-full mr-2"
                  style={{ backgroundColor: getBulletColor(columnId) }}
                ></div>
                <h2 className="text-lg font-semibold flex items-center">
                  {column.title}
                  <span className="flex bord_5 ml-2 p-3 text-sm">{column.items.length}</span>
                </h2>
               
              </div> {renderAdd(columnId)}
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
                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
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
