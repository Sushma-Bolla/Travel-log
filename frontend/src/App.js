import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file

function App() {
    const [logs, setLogs] = useState([]);
    const [form, setForm] = useState({
        title: '', description: '', location: '', date: '', rating: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/logs')
            .then(res => setLogs(res.data))
            .catch(err => console.log("Error fetching logs:", err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:1080/api/logs', form)
            .then(() => {
                setForm({ title: '', description: '', location: '', date: '', rating: '' });
                return axios.get('http://localhost:1080/api/logs');
            })
            .then(res => setLogs(res.data))
            .catch(err => console.log("Error adding log:", err));
    };

    return (
        <div className="container">
            <h1>Travel Log 📍</h1>
            
            <form onSubmit={handleSubmit} className="form">
                <input name="title" placeholder="Title" onChange={handleChange} value={form.title} required />
                <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} required></textarea>
                <input name="location" placeholder="Location" onChange={handleChange} value={form.location} required />
                <input type="date" name="date" onChange={handleChange} value={form.date} required />
                <input type="number" name="rating" placeholder="Rating (1-5)" min="1" max="5" onChange={handleChange} value={form.rating} required />
                <button type="submit">Add Log</button>
            </form>

            <ul className="log-list">
                {logs.map(log => (
                    <li key={log._id} className="log-item">
                        <h2>{log.title}</h2>
                        <p>{log.description}</p>
                        <p><strong>Location:</strong> {log.location}</p>
                        <p><strong>Date:</strong> {new Date(log.date).toDateString()}</p>
                        <p><strong>Rating:</strong> {log.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
