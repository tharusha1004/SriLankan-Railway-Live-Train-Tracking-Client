import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserDashboard.css'; // Ensure this file is created for styling

const UserDashboard = () => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [trainDetails, setTrainDetails] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [location, setLocation] = useState(null);
  const [engineStatus, setEngineStatus] = useState(null);

  useEffect(() => {
    axios.get("http://13.233.145.157:3004/api/trains")
      .then((response) => {
        setTrains(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trains:", error);
      });
  }, []);

  const handleTrainSelection = (trainId) => {
    setSelectedTrain(trainId);
    fetchTrainDetails(trainId);
    fetchTrainSchedules(trainId);
    fetchTrainLocation(trainId);
    fetchEngineStatus(trainId);
  };

  const fetchTrainDetails = (trainId) => {
    const selectedTrainData = trains.find(train => train.trainId === trainId);
    setTrainDetails(selectedTrainData);
  };

  const fetchTrainSchedules = (trainId) => {
    axios.get("http://13.233.145.157:3003/api/schedules")
      .then((response) => {
        const filteredSchedules = response.data.filter(schedule => schedule.trainId === trainId);
        setSchedules(filteredSchedules);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
      });
  };

  const fetchTrainLocation = (trainId) => {
    axios.get("http://13.233.145.157:3005/api/train-location")
      .then((response) => {
        const trainLocation = response.data.find(loc => loc.trainId === trainId);
        setLocation(trainLocation);
      })
      .catch((error) => {
        console.error("Error fetching train location:", error);
      });
  };

  const fetchEngineStatus = (trainId) => {
    const selectedTrainData = trains.find(train => train.trainId === trainId);

    if (!selectedTrainData || !selectedTrainData.engineId) {
      console.error("No engineId found for the selected train.");
      return;
    }

    const engineId = selectedTrainData.engineId;

    axios.get(`http://13.233.145.157:3001/api/engine-status?engineId=${engineId}`)
      .then((response) => {
        console.log('Engine Status Response:', response.data);
        setEngineStatus(response.data[0]); // Assuming response data is an array
      })
      .catch((error) => {
        console.error("Error fetching engine status:", error);
      });
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Dashboard</h1>
      <h2 className="select-train-title">Select a Train</h2>
      <div className="train-buttons">
        {trains.map((train) => (
          <button
            key={train.trainId}
            className={`train-button ${selectedTrain === train.trainId ? 'selected' : ''}`}
            onClick={() => handleTrainSelection(train.trainId)}
          >
            {train.trainName} ({train.lane})
          </button>
        ))}
      </div>

      {selectedTrain && (
        <div className="details-container">
          <h2 className="section-title">Train Details</h2>
          <div className="details-card">
            <p><strong>Train Name:</strong> {trainDetails?.trainName}</p>
            <p><strong>Lane:</strong> {trainDetails?.lane}</p>
          </div>

          <h2 className="section-title">Train Schedules</h2>
          <div className="details-card">
            {schedules.length > 0 ? (
              <ul className="schedules-list">
                {schedules.map((schedule) => (
                  <li key={schedule._id} className="schedule-item">
                    Start: {schedule.startStation} at {new Date(schedule.startTime).toLocaleTimeString()}
                    | End: {schedule.endStation} at {new Date(schedule.endTime).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No schedules available for this train.</p>
            )}
          </div>

          <h2 className="section-title">Live Location</h2>
          <div className="details-card">
            {location ? (
              <p>
                <strong>Current Station:</strong> {location.currentStation} | <strong>Status:</strong> {location.status}
              </p>
            ) : (
              <p>No live location available.</p>
            )}
          </div>

          <h2 className="section-title">Engine Status</h2>
          <div className="details-card">
            {engineStatus ? (
              <p>
                <strong>Status:</strong> {engineStatus.status} |
                <strong>Current Station:</strong> {engineStatus.currentStation} |
                <strong>Delay:</strong> {engineStatus.delayTime} minutes
              </p>
            ) : (
              <p>No engine status available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
