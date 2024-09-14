import React, { useState } from 'react';
import axios from 'axios';
import './TrainDetailsPage.css'; // Assuming you have a CSS file for additional styling

const TrainDetailsPage = () => {
  const [trainName, setTrainName] = useState('');
  const [trainId, setTrainId] = useState('');
  const [lane, setLane] = useState('');
  //const [trainToUpdateId, setTrainToUpdateId] = useState('');
  //const [trainToUpdate, setTrainToUpdate] = useState(null);

  const adminCredentials = 'admin:123456';
  const encodedCredentials = btoa(adminCredentials);

  // Function to create a new train
  const createTrain = () => {
    if (!trainName || !trainId || !lane) {
      alert('Please fill out all fields to create a train.');
      return;
    }

    axios.post('http://13.233.145.157:3004/api/trains', { trainName, trainId, lane }, {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      }
    })
    .then(response => {
      alert('Train created successfully!');
      setTrainName('');
      setTrainId('');
      setLane('');
    })
    .catch(error => {
      alert('Error creating train: ' + (error.response?.data?.message || error.message));
    });
  };

  // // Function to fetch train details by trainId
  // const fetchTrainById = () => {
  //   if (!trainToUpdateId) {
  //     alert('Please enter the Train ID to fetch.');
  //     return;
  //   }

  //   axios.get(`http://localhost:3004/api/trains/${trainToUpdateId}`, {
  //     headers: {
  //       'Authorization': `Basic ${encodedCredentials}`
  //     }
  //   })
  //   .then(response => {
  //     setTrainToUpdate(response.data);
  //     setTrainName(response.data.trainName);
  //     setTrainId(response.data.trainId);
  //     setLane(response.data.lane);
  //   })
  //   .catch(error => {
  //     alert('Error fetching train details: ' + (error.response?.data?.message || error.message));
  //   });
  // };

  // // Function to update an existing train by MongoDB _id
  // const updateTrain = () => {
  //   if (!trainToUpdate || !trainToUpdate._id || !trainName || !trainId || !lane) {
  //     alert('Please fill out all fields to update the train.');
  //     return;
  //   }

  //   axios.put(`http://localhost:3004/api/trains/${trainToUpdate._id}`, { trainName, trainId, lane }, {
  //     headers: {
  //       'Authorization': `Basic ${encodedCredentials}`
  //     }
  //   })
  //   .then(response => {
  //     alert('Train updated successfully!');
  //     setTrainToUpdateId('');
  //     setTrainName('');
  //     setTrainId('');
  //     setLane('');
  //     setTrainToUpdate(null);
  //   })
  //   .catch(error => {
  //     alert('Error updating train: ' + (error.response?.data?.message || error.message));
  //   });
  // };

  return (
    <div className="train-details-container">
      <h1 className="train-title">Train Details Management</h1>

      <div className="train-card create-train">
        <h2>Create a New Train</h2>
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
          <label>Lane</label>
          <input
            type="text"
            placeholder="Enter Lane"
            value={lane}
            onChange={(e) => setLane(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" onClick={createTrain}>Create Train</button>
      </div>

      {/* <div className="train-card update-train">
        <h2>Update an Existing Train</h2>
        <div className="form-group">
          <label>Train ID to Fetch</label>
          <input
            type="text"
            placeholder="Enter Train ID to Fetch"
            value={trainToUpdateId}
            onChange={(e) => setTrainToUpdateId(e.target.value)}
            className="form-control"
          />
          <button className="btn btn-secondary" onClick={fetchTrainById}>Fetch Train</button>
        </div>
        {trainToUpdate && (
          <>
            <div className="form-group">
              <label>Updated Train Name</label>
              <input
                type="text"
                placeholder="Enter Updated Train Name"
                value={trainName}
                onChange={(e) => setTrainName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Updated Lane</label>
              <input
                type="text"
                placeholder="Enter Updated Lane"
                value={lane}
                onChange={(e) => setLane(e.target.value)}
                className="form-control"
              />
            </div>
            <button className="btn btn-success" onClick={updateTrain}>Update Train</button>
          </>
        )}
      </div> */}
    </div>
  );
};

export default TrainDetailsPage;
