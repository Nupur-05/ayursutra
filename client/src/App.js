import React, { useState, useEffect } from 'react';
import './App.css'; // This will be your main CSS file

function App() {
  const [appointments, setAppointments] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  // Fetch appointments from the backend
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
    fetchAppointments();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientName: name, appointmentTime: time }),
      });
      // Clear form and re-fetch appointments
      setName('');
      setTime('');
      fetchAppointments();
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ayursutra MVP - Appointment Scheduler</h1>
        <p>Ancient Wisdom • Modern Care</p>
      </header>
      <main>
        <section className="form-section">
          <h2>Book a New Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Patient Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
            </div>
            <div>
              <label>
                Appointment Time:
                <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} required />
              </label>
            </div>
            <button type="submit">Schedule Appointment</button>
          </form>
        </section>
        <section className="list-section">
          <h2>Upcoming Appointments</h2>
          <ul>
            {appointments.map((appt) => (
              <li key={appt.id}>
                <strong>{appt.patient_name}</strong> at {new Date(appt.appointment_time).toLocaleString()}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
