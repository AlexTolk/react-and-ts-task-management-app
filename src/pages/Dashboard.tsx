import React, { useState, useEffect } from 'react';

// Define the Task interface
interface Task {
  id: string;
  title: string;
  status: 'completed' | 'active';
  description: string;
  assignee: string; // New property for the task assignee
}

const Dashboard: React.FC = () => {
  // State for tasks, users, active tab, and selected user
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<string[]>(['Alice', 'Bob', 'Charlie']); // Example list of users
  const [activeTab, setActiveTab] = useState<'product' | 'backlog'>('product');
  const [selectedUser, setSelectedUser] = useState<string>('All');

  // Simulated data fetching using useEffect
  useEffect(() => {
    const fetchedTasks: Task[] = [
      { id: '1', title: 'Task 1', status: 'completed', description: 'Description of Task 1', assignee: 'Alice' },
      { id: '2', title: 'Task 2', status: 'completed', description: 'Description of Task 2', assignee: 'Bob' },
      { id: '3', title: 'Task 3', status: 'active', description: 'Description of Task 3', assignee: 'Charlie' },
    ];
    setTasks(fetchedTasks);
  }, []);

  // Function to handle tab switching
  const handleTabClick = (tab: 'product' | 'backlog') => {
    setActiveTab(tab);
  };

  // Function to handle user selection
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
  };

  // Filter tasks based on the selected user
  const filteredTasks = selectedUser === 'All'
    ? tasks
    : tasks.filter(task => task.assignee === selectedUser);

  return (
    <div className="dashboard">
      <h1>Main Page (Dashboard)</h1>

      {/* Tab Buttons */}
      <div className="tabs">
        <button
          className={activeTab === 'product' ? 'active' : ''}
          onClick={() => handleTabClick('product')}
        >
          Product
        </button>
        <button
          className={activeTab === 'backlog' ? 'active' : ''}
          onClick={() => handleTabClick('backlog')}
        >
          Backlog
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'product' ? (
          <div className="product-content">
            <h2>Product Tab Content</h2>
            <p>Here you can display product-related tasks or information.</p>
          </div>
        ) : (
          <div className="backlog-content">
            <h2>Backlog Tab Content</h2>
            <p>Here you can display tasks or items in the backlog.</p>
          </div>
        )}
      </div>

      {/* User Selection Dropdown */}
      <div className="user-filter">
        <label htmlFor="user-select">Filter by User: </label>
        <select id="user-select" value={selectedUser} onChange={handleUserChange}>
          <option value="All">All</option>
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>

      {/* Filtered Tasks */}
      <div className="filtered-tasks">
        <h3>{selectedUser === 'All' ? 'All Tasks' : `Tasks for ${selectedUser}`}</h3>
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong>: {task.description} (Assigned to: {task.assignee})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;