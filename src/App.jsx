import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ReservationPage from './pages/ReservationPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <div className="main-content-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/reservasi" element={<ReservationPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
