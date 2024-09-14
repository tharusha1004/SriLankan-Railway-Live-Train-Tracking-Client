import React, { useState } from 'react';
import axios from 'axios';
import './ScheduleDetailsPage.css'; // Assuming you have a CSS file for additional styling

const ScheduleDetailsPage = () => {
  const [trainId, setTrainId] = useState('');
  const [startStation, setStartStation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endStation, setEndStation] = useState('');
  const [endTime, setEndTime] = useState('');
  const [stations, setStations] = useState([]);
  const [newStation, setNewStation] = useState('');

  const adminCredentials = 'admin:123456';
  const encodedCredentials = btoa(adminCredentials);

  // Function to create a new schedule
  const createSchedule = () => {
    if (!trainId || !startStation || !startTime || !endStation || !endTime || stations.length === 0) {
      alert('Please fill out all fields and add at least one station to create a schedule.');
      return;
    }

    axios.post('http://13.233.145.157:3003/api/schedules', {
      trainId,
      startStation,
      startTime,
      endStation,
      endTime,
      stations
    }, {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      }
    })
    .then(response => {
      alert('Schedule created successfully!');
      setTrainId('');
      setStartStation('');
      setStartTime('');
      setEndStation('');
      setEndTime('');
      setStations([]);
      setNewStation('');
    })
    .catch(error => {
      alert('Error creating schedule: ' + (error.response?.data?.message || error.message));
    });
  };

  // Function to add a new station to the list
  const addStation = () => {
    if (newStation.trim() !== '') {
      setStations([...stations, newStation.trim()]);
      setNewStation('');
    }
  };

  // Function to handle Enter key press for adding a new station
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addStation();
    }
  };

  return (
    <div className="schedule-details-container">
      <h1 className="schedule-title">Schedule Management</h1>

      <div className="schedule-card create-schedule">
        <h2>Create a New Schedule</h2>
        <div className="form-group">
          <label>Train ID</label>
          <input
            type="text"
            placeholder="Enter Train ID"
            value={trainId}
            onChange={(e) => setTrainId(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Start Station</label>
          <input
            type="text"
            placeholder="Enter Start Station"
            value={startStation}
            onChange={(e) => setStartStation(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>End Station</label>
          <input
            type="text"
            placeholder="Enter End Station"
            value={endStation}
            onChange={(e) => setEndStation(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Stations</label>
          <input
            type="text"
            placeholder="Enter Station"
            value={newStation}
            onChange={(e) => setNewStation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-control"
          />
          <button className="btn btn-secondary" onClick={addStation}>Add Station</button>
          <ul>
            {stations.map((station, index) => (
              <li key={index}>{station}</li>
            ))}
          </ul>
        </div>
        <button className="btn btn-primary" onClick={createSchedule}>Create Schedule</button>
      </div>
    </div>
  );
};

export default ScheduleDetailsPage;
