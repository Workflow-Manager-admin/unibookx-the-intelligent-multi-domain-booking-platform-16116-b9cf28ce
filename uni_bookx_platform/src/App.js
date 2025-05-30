import React from 'react';
import './App.css';
import MainLayout from './components/MainLayout';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Placeholder pages for routes
const Home = () => (
  <section className="ubx-container ubx-page-section">
    <h1 className="title">Welcome to UniBookX</h1>
    <div className="description">
      The intelligent multi-domain booking platform. <br />
      Discover sports, movies, travel, concerts, and more — all in one place, powered by AI.
    </div>
  </section>
);
const UniversalSearch = () => (
  <section className="ubx-container ubx-page-section">
    <h2 className="title">Universal Search</h2>
    <div className="description">Semantic and cross-domain search for tickets and events.</div>
    <input
      className="ubx-input"
      type="search"
      placeholder="Search by event, location, date, or category..."
      aria-label="Universal Search"
      style={{ maxWidth: 500 }}
    />
  </section>
);
const BookingFlow = () => (
  <section className="ubx-container ubx-page-section">
    <h2 className="title">Booking Flow</h2>
    <div className="description">Start your booking journey. Select seats, bundle trips, and more!</div>
    <button className="ubx-btn ubx-btn-primary">Start Booking</button>
  </section>
);
const Dashboard = () => (
  <section className="ubx-container ubx-page-section">
    <h2 className="title">Personal Dashboard</h2>
    <div className="description">Access your tickets, preferences, alerts, and recommendations.</div>
  </section>
);
const AdminPortal = () => (
  <section className="ubx-container ubx-page-section">
    <h2 className="title">Admin & Vendor Portal</h2>
    <div className="description">Manage events, prices, reports and vendor analytics.</div>
  </section>
);

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<UniversalSearch />} />
          <Route path="/booking" element={<BookingFlow />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPortal />} />
          {/* Default fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;