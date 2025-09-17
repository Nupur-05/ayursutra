import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import MetricsPanel from './components/MetricsPanel';
import TherapyCards from './components/TherapyCards';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import Instructions from './components/Instructions';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">AyurSutra</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/book">Book</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/instructions">Instructions</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <MetricsPanel />
            <TherapyCards />
          </>
        } />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

