import React, { useState } from 'react';

// Define the Task interface
interface Task {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  assignee: string;
  timeEstimate: string;
  description: string;
}

const AdminPanel: React.FC = () => {
  const [task, setTask] = useState<Task>({
    id: '',
    title: '',
    subtitle: '',
    author: '',
    assignee: '',
    timeEstimate: '',
    description: '',
  });

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.title && task.subtitle && task.author && task.assignee && task.timeEstimate && task.description.length >= 40) {
      // Add validation and create task logic here
      console.log('Task Created:', task);
    } else {
      alert('Please fill in all fields and ensure the description is at least 40 characters.');
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel (Create Task)</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="subtitle" placeholder="Subtitle" onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
        <input type="text" name="assignee" placeholder="Assignee" onChange={handleChange} required />
        <input type="text" name="timeEstimate" placeholder="Time Estimate (e.g., 6h or 1d 6h)" onChange={handleChange} required />
        <textarea name="description" placeholder="Description (min 40 characters)" onChange={handleChange} required></textarea>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default AdminPanel;
