import React, { useState, useEffect } from 'react';
import './DoctorPortal.css';

function DoctorPortal() {
  const [appointments, setAppointments] = useState([]);

  // Function to fetch appointments from the backend
  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    // Fetch data when the component loads
    fetchAppointments();
    
    // Set up real-time updates (polling every 10 seconds)
    const interval = setInterval(() => {
      fetchAppointments();
    }, 10000); 

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []); // The empty array ensures this effect runs only once

  return (
    <div className="doctor-portal">
      <header className="portal-header">
        <h1>Ayursutra Doctor's Portal</h1>
        <p>Appointment Dashboard</p>
      </header>
      <main className="portal-main">
        <section className="appointments-section">
          <h2>Upcoming Appointments</h2>
          {appointments.length > 0 ? (
            <ul className="appointment-list">
              {appointments.map((appt) => (
                <li key={appt.id} className="appointment-item">
                  <div className="appointment-details">
                    <span className="patient-name">{appt.patient_name}</span>
                    <span className="appointment-time">{new Date(appt.appointment_time).toLocaleString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments scheduled yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default DoctorPortal;