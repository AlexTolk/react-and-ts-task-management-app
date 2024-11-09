import React, { useState } from 'react';

const AdminPanel: React.FC = () => {
  const [task, setTask] = useState({
    title: '',
    subtitle: '',
    author: '',
    assignee: '',
    timeEstimate: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form and add task
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
