import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateTripScreen = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      await axios.post('/api/trips', { destination, startDate, endDate }, config);
      navigate('/trips');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create a New Trip</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
};

export default CreateTripScreen;
