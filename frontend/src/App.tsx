// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Register from './auth/register';
import Login from './auth/login';
import Dashboard from './dashboard/dash';

function App() {


  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </Router>
    
  )
}

export default App
