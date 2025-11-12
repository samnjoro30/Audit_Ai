// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Register from './auth/register';

function App() {


  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>

    </Router>
    
  )
}

export default App
