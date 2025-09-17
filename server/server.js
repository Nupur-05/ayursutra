const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
console.log('Attempting to create new Pool for database connection...');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ayursutra_db',
  password: '1234', // Make sure this is correct
  port: 5432,
});
console.log('Database connection pool created.');

// A simple endpoint to test the server
app.get('/', (req, res) => {
  res.send('Ayursutra Backend is running!');
});

// Endpoint to schedule a new appointment
app.post('/api/appointments', async (req, res) => {
  console.log('Received POST request to /api/appointments');
  console.log('Request Body:', req.body);

  const { patientName, appointmentTime } = req.body;

  // Basic validation
  if (!patientName || !appointmentTime) {
    console.log('Validation failed: patientName or appointmentTime is missing.');
    return res.status(400).send('Missing patientName or appointmentTime.');
  }

  try {
    console.log(
      `Attempting to insert: { patientName: '${patientName}', appointmentTime: '${appointmentTime}' }`
    );

    const newAppointment = await pool.query(
      "INSERT INTO appointments (patient_name, appointment_time) VALUES ($1, $2) RETURNING *",
      [patientName, appointmentTime]
    );

    console.log('Database INSERT successful. Rows:', newAppointment.rows);
    res.json(newAppointment.rows[0]);
  } catch (err) {
    console.error('!!!!!!!! DATABASE ERROR !!!!!!!!');
    console.error(err);
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    res.status(500).send('Server Error');
  }
});

// Endpoint to get all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const allAppointments = await pool.query(
      "SELECT * FROM appointments ORDER BY appointment_time DESC"
    );
    res.json(allAppointments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
