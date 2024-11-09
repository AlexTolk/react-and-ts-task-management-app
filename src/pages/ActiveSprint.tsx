import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import '../styles/ActiveSprint.scss'

interface Task {
  id: string;
  title: string;
  status: 'to-do' | 'in-progress' | 'done';
  assignee: string;
}

const ActiveSprint: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Design Homepage', status: 'to-do', assignee: 'Alice' },
    { id: '2', title: 'Develop API', status: 'in-progress', assignee: 'Bob' },
    { id: '3', title: 'Test User Flow', status: 'done', assignee: 'Charlie' },
  ]);
  const [selectedAssignee, setSelectedAssignee] = useState<string>('All');

  // Handle assignee filter change
  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAssignee(e.target.value);
  };

  // Filter tasks based on selected assignee
  const filteredTasks = selectedAssignee === 'All'
    ? tasks
    : tasks.filter(task => task.assignee === selectedAssignee);

  // Split tasks by status for the Kanban board
  const tasksByStatus = {
    'to-do': filteredTasks.filter(task => task.status === 'to-do'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    'done': filteredTasks.filter(task => task.status === 'done'),
  };

  // Handle drag end event
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId as 'to-do' | 'in-progress' | 'done';
    const destinationStatus = destination.droppableId as 'to-do' | 'in-progress' | 'done';

    if (sourceStatus === destinationStatus) return;

    // Move the task to the new status
    const updatedTasks = tasks.map(task => {
      if (task.id === result.draggableId) {
        return { ...task, status: destinationStatus };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <div className="active-sprint">
      <h1>Active Sprint</h1>

      {/* Assignee Filter */}
      <div className="assignee-filter">
        <label htmlFor="assignee-select">Filter by Assignee: </label>
        <select id="assignee-select" value={selectedAssignee} onChange={handleAssigneeChange}>
          <option value="All">All</option>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
          <option value="Charlie">Charlie</option>
        </select>
      </div>

      {/* Kanban Board with Drag-and-Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {Object.entries(tasksByStatus).map(([status, tasks]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className={`kanban-column ${status}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{status.replace('-', ' ').toUpperCase()}</h3>
                  <ul>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <strong>{task.title}</strong> (Assigned to: {task.assignee})
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ActiveSprint;
