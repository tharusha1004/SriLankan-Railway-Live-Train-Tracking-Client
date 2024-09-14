import React, { useState } from 'react';
import axios from 'axios';
import './EngineStatusPage.css'; // Import the CSS file

const EngineStatusPage = () => {
  const [engineId, setEngineId] = useState('');
  const [status, setStatus] = useState('');
  const [currentStation, setCurrentStation] = useState('');
  const [delayTime, setDelayTime] = useState('');

  const adminCredentials = 'admin:123456';
  const encodedCredentials = btoa(adminCredentials);

  // Function to create or update an engine status
  const createOrUpdateEngine = () => {
    if (!engineId || !status || !currentStation) {
      alert('Please fill out all fields to create or update an engine status.');
      return;
    }

    axios.post('http://13.233.145.157:3001/api/engine-status', {
      engineId,
      status,
      currentStation,
      delayTime: delayTime || 0
    }, {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      }
    })
    .then(response => {
      alert('Engine status updated successfully!');
      setEngineId('');
      setStatus('');
      setCurrentStation('');
      setDelayTime('');
    })
    .catch(error => {
      alert('Error creating or updating engine status: ' + (error.response?.data?.message || error.message));
    });
  };

  return (
    <div className="engine-status-container">
      <h1 className="engine-status-title">Engine Status Management</h1>

      <div className="engine-status-card">
        <h2>Create or Update Engine Status</h2>
        <div className="form-group">
          <label>Engine ID</label>
          <input
            type="text"
            placeholder="Enter Engine ID"
            value={engineId}
            onChange={(e) => setEngineId(e.target.value)}
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
            <option value="Operational">Operational</option>
            <option value="Crashing">Crashing</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
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
          <label>Delay Time (Minutes)</label>
          <input
            type="number"
            placeholder="Enter Delay Time"
            value={delayTime}
            onChange={(e) => setDelayTime(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" onClick={createOrUpdateEngine}>Submit</button>
      </div>
    </div>
  );
};

export default EngineStatusPage;
