import React, { useState } from 'react';
import { bookAppointment } from '../api';
import { useNavigate } from 'react-router-dom';

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    therapyType: 'Abhyanga',
    date: '',
    time: '',
    language: 'English'
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('Booking...');
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        therapyType: form.therapyType,
        date: form.date,
        time: form.time,
        language: form.language
      };
      const res = await bookAppointment(payload);
      if (res.success) {
        setMsg('✅ Appointment booked! Confirmation (SMS) sent.');
        setForm({ name: '', phone: '', therapyType: 'Abhyanga', date: '', time: '', language: 'English' });
        // navigate to instructions so judge sees the care instructions right away
        setTimeout(() => navigate('/instructions'), 700);
      } else {
        setMsg('❌ Booking failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setMsg('❌ Error booking. Check backend or network.');
    }
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3">Book a New Appointment</h3>
      <div className="card p-3 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Patient Name</label>
            <input required name="name" value={form.name} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone (include country code)</label>
            <input required name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="+91XXXXXXXXXX" />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Therapy</label>
              <select name="therapyType" value={form.therapyType} onChange={handleChange} className="form-select">
                <option>Abhyanga</option>
                <option>Virechana</option>
                <option>Vamana</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Date</label>
              <input required name="date" value={form.date} onChange={handleChange} type="date" className="form-control" />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Time</label>
              <input required name="time" value={form.time} onChange={handleChange} type="time" className="form-control" />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Language</label>
            <select name="language" value={form.language} onChange={handleChange} className="form-select">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

          <button className="btn btn-success w-100" type="submit">Book Appointment</button>
        </form>

        {msg && <div className="mt-3">{msg}</div>}
      </div>
    </div>
  );
}
