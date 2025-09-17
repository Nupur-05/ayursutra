import AnalyticsWidget from "./AnalyticsWidget";

import React, { useEffect, useState } from 'react';
import { getAppointments, updateStatus } from '../api';

function getName(appt){
  return appt.name || appt.patient_name || appt.patient || 'Unknown';
}
function getTime(appt){
  if (appt.appointment_time) return new Date(appt.appointment_time).toLocaleString();
  if (appt.date && appt.time) return `${appt.date} ${appt.time}`;
  if (appt.date) return new Date(appt.date).toLocaleString();
  return '';
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleStatus = async (id, status) => {
    await updateStatus(id, status);
    fetchData();
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3">Clinic Dashboard</h3>

<AnalyticsWidget appointments={appointments} />

      <div className="card p-3 shadow-sm">
        {loading ? <p>Loading...</p> : (
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>Patient</th>
                <th>Phone</th>
                <th>Therapy</th>
                <th>Date / Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 && <tr><td colSpan="6">No appointments yet.</td></tr>}
              {appointments.map(a => (
                <tr key={a.id}>
                  <td>{getName(a)}</td>
                  <td>{a.phone || '-'}</td>
                  <td>{a.therapyType || a.therapy || '-'}</td>
                  <td>{getTime(a)}</td>
                  <td>{a.status || 'Pending'}</td>
                  <td>
                    <button className="btn btn-sm btn-success me-2" onClick={() => handleStatus(a.id, 'Completed')}>Completed</button>
                    <button className="btn btn-sm btn-warning" onClick={() => handleStatus(a.id, 'Pending')}>Pending</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
