const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'ayursutra_db',
  password: 'your_db_password',
  port: 5432,
  // IMPORTANT: Disable SSL verification for self-signed certificates
  ssl: {
    rejectUnauthorized: false
  }
});

// A simple endpoint to test the server
app.get('/', (req, res) => {
  res.send('Ayursutra Backend is running!');
});

// Endpoint to schedule a new appointment
app.post('/api/appointments', async (req, res) => {
  const { patientName, appointmentTime } = req.body;
  try {
    const newAppointment = await pool.query(
      "INSERT INTO appointments (patient_name, appointment_time) VALUES ($1, $2) RETURNING *",
      [patientName, appointmentTime]
    );
    res.json(newAppointment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint to get all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const allAppointments = await pool.query("SELECT * FROM appointments ORDER BY appointment_time DESC");
    res.json(allAppointments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});