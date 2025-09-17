import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const api = axios.create({ baseURL: API_URL });

export const getAppointments = () => api.get('/appointments').then(r => r.data);
export const bookAppointment = (payload) => api.post('/book', payload).then(r => r.data);
export const updateStatus = (id, status) => api.patch(`/appointments/${id}`, { status }).then(r => r.data);
