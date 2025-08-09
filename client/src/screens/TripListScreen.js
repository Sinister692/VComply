import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TripListScreen = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const { data } = await axios.get('/api/trips', config);
        setTrips(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div>
      <h1>My Trips</h1>
      <Link to="/createtrip">
        <button>Create New Trip</button>
      </Link>
      {trips.map((trip) => (
        <div key={trip._id}>
          <h2>{trip.destination}</h2>
          <p>
            {new Date(trip.startDate).toLocaleDateString()} -{' '}
            {new Date(trip.endDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TripListScreen;
