import React, { useState } from 'react';
import axios from 'axios';
import './TrainLocationPage.css'; // Import the CSS file

const TrainLocationPage = () => {
  const [trainId, setTrainId] = useState('');
  const [trainName, setTrainName] = useState('');
  const [currentStation, setCurrentStation] = useState('');
  const [status, setStatus] = useState('');

  const adminCredentials = 'admin:123456';
  const encodedCredentials = btoa(adminCredentials);

  // Function to create a new train location
  const createLocation = () => {
    if (!trainId || !trainName || !currentStation || !status) {
      alert('Please fill out all fields to create a train location.');
      return;
    }

    axios.post('http://13.233.145.157:3005/api/train-location', {
      trainId,
      trainName,
      currentStation,
      status
    }, {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      }
    })
    .then(response => {
      alert('Train location added successfully!');
      setTrainId('');
      setTrainName('');
      setCurrentStation('');
      setStatus('');
    })
    .catch(error => {
      alert('Error adding train location: ' + (error.response?.data?.message || error.message));
    });
  };

  return (
    <div className="train-location-container">
      <h1 className="train-location-title">Train Location Management</h1>

      <div className="train-location-card create-location">
        <h2>Add Train Location</h2>
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
          <label>Train Name</label>
          <input
            type="text"
            placeholder="Enter Train Name"
            value={trainName}
            onChange={(e) => setTrainName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Current Station</label>
          <input
            type="text"
            placeholder="Enter Current Station"
            value={currentStation}
            onChange={(e) => setCurrentStation(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-control"
          >
            <option value="">Select Status</option>
            <option value="On Time">On Time</option>
            <option value="Early">Early</option>
            <option value="Late">Late</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={createLocation}>Add Location</button>
      </div>
    </div>
  );
};

export default TrainLocationPage;
