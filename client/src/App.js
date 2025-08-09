import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import TripListScreen from './screens/TripListScreen';
import CreateTripScreen from './screens/CreateTripScreen';

function App() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route
            path="/trips"
            element={userInfo ? <TripListScreen /> : <Navigate to="/login" />}
          />
          <Route
            path="/createtrip"
            element={userInfo ? <CreateTripScreen /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={userInfo ? <Navigate to="/trips" /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
