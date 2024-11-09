import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ActiveSprint from './pages/ActiveSprint';
import AdminPanel from './pages/AdminPanel';
import NavBar from './components/NavBar';
import './App.scss'

const App: React.FC = () => {
  return (
    <>
      <Router>
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sprint" element={<ActiveSprint />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;