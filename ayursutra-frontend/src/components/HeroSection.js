import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="hero-section text-white d-flex align-items-center">
      <div className="container text-center">
        <h1 className="display-5 fw-bold">Panchakarma — Simplified & Personalized</h1>
        <p className="lead mb-3">Book sessions, get care instructions, reduce wait time — tradition with modern convenience.</p>
        <div>
          <button className="btn btn-light btn-lg me-2" onClick={() => navigate('/book')}>Book Appointment</button>
          <button className="btn btn-outline-light btn-lg" onClick={() => navigate('/dashboard')}>Clinic Dashboard</button>
        </div>
      </div>
    </section>
  );
}
