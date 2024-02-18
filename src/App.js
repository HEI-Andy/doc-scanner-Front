import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import ConnexionPage from './components/ConnexionPage'; // Importez votre composant ConnexionPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<ConnexionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
