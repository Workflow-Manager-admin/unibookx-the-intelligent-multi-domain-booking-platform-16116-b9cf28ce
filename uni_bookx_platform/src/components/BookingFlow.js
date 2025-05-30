import React, { useState, useEffect } from "react";
import { useBooking } from "../App";
import { useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * BookingFlow: Contextual, themed booking UI for UniBookX.
 * - Dropdown for booking purpose selection.
 * - Dynamically displays a contextual form styled in UniBookX theme (black-orange, atomic CSS).
 * - On submit, persists to shared booking history state for admin dashboard.
 */
const PURPOSES = [
  { value: "sports", emoji: "🏟️", label: "Sports Events" },
  { value: "movies", emoji: "🎬", label: "Movies & Shows" },
  { value: "travel", emoji: "✈️", label: "Travel (Bus/Train/Flights)" },
  { value: "venues", emoji: "🏛️", label: "Event Venues" },
  { value: "resorts", emoji: "🏖️", label: "Resorts" },
  { value: "local_events", emoji: "📅", label: "Local Events" },
  { value: "concerts", emoji: "🎵", label: "Concerts" }
];

// Map form fields by purpose (light, contextual)
function getInitialForm(purpose) {
  switch (purpose) {
    case "sports":
      return { name: "", email: "", event: "", sport: "", date: "", seats: 1 };
    case "movies":
      return { name: "", email: "", movie: "", theatre: "", datetime: "", seats: 1 };
    case "travel":
      return { name: "", email: "", from: "", to: "", date: "", travelMode: "", passengers: 1 };
    case "venues":
      return { name: "", email: "", venue: "", eventType: "", date: "", people: 1 };
    case "resorts":
      return { name: "", email: "", resort: "", checkin: "", checkout: "", rooms: 1 };
    case "local_events":
      return { name: "", email: "", event: "", location: "", date: "", tickets: 1 };
    case "concerts":
      return { name: "", email: "", artist: "", concert: "", date: "", tickets: 1 };
    default:
      return { name: "", email: "" };
  }
}

// Simple form validation
function validateRequired(purpose, form) {
  const mapping = {
    sports: ["name", "email", "event", "sport", "date", "seats"],
    movies: ["name", "email", "movie", "theatre", "datetime", "seats"],
    travel: ["name", "email", "from", "to", "date", "travelMode", "passengers"],
    venues: ["name", "email", "venue", "eventType", "date", "people"],
    resorts: ["name", "email", "resort", "checkin", "checkout", "rooms"],
    local_events: ["name", "email", "event", "location", "date", "tickets"],
    concerts: ["name", "email", "artist", "concert", "date", "tickets"]
  };
  const fields = mapping[purpose] || [];
  return fields.every(f => form[f] !== undefined && String(form[f]).trim() !== "");
}

function BookingFormFields({ purpose, form, setForm }) {
  // PUBLIC_INTERFACE
  switch (purpose) {
    case "sports":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Event Name" value={form.event} onChange={e => setForm(f => ({ ...f, event: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="Sport (e.g., Cricket, Football)" value={form.sport} onChange={e => setForm(f => ({ ...f, sport: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input className="ubx-input" type="number" min="1" placeholder="Seats" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: e.target.value }))} required />
        </>
      );
    case "movies":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Movie Name" value={form.movie} onChange={e => setForm(f => ({ ...f, movie: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="Theatre" value={form.theatre} onChange={e => setForm(f => ({ ...f, theatre: e.target.value }))} required />
          <input className="ubx-input" type="datetime-local" placeholder="Date/Time" value={form.datetime} onChange={e => setForm(f => ({ ...f, datetime: e.target.value }))} required />
          <input className="ubx-input" type="number" min="1" placeholder="Seats" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: e.target.value }))} required />
        </>
      );
    case "travel":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="From" value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="To" value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))} required />
          <select className="ubx-input" value={form.travelMode} onChange={e => setForm(f => ({ ...f, travelMode: e.target.value }))} required>
            <option value="">Travel Mode</option>
            <option value="flight">Flight</option>
            <option value="train">Train</option>
            <option value="bus">Bus</option>
            <option value="cab">Cab/Taxi</option>
          </select>
          <input className="ubx-input" type="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input className="ubx-input" type="number" min="1" placeholder="Passengers" value={form.passengers} onChange={e => setForm(f => ({ ...f, passengers: e.target.value }))} required />
        </>
      );
    case "venues":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Venue Name" value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="Event Type" value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input className="ubx-input" type="number" min="1" placeholder="No. of People" value={form.people} onChange={e => setForm(f => ({ ...f, people: e.target.value }))} required />
        </>
      );
    case "resorts":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Resort Name" value={form.resort} onChange={e => setForm(f => ({ ...f, resort: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Check-in" value={form.checkin} onChange={e => setForm(f => ({ ...f, checkin: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Check-out" value={form.checkout} onChange={e => setForm(f => ({ ...f, checkout: e.target.value }))} required />
          <input className="ubx-input" type="number" min="1" placeholder="Rooms" value={form.rooms} onChange={e => setForm(f => ({ ...f, rooms: e.target.value }))} required />
        </>
      );
    case "local_events":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Event Name" value={form.event} onChange={e => setForm(f => ({ ...f, event: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input className="ubx-input" type="number" min="1" placeholder="Tickets" value={form.tickets} onChange={e => setForm(f => ({ ...f, tickets: e.target.value }))} required />
        </>
      );
    case "concerts":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Artist Name" value={form.artist} onChange={e => setForm(f => ({ ...f, artist: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="Concert" value={form.concert} onChange={e => setForm(f => ({ ...f, concert: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input className="ubx-input" type="number" min="1" placeholder="Tickets" value={form.tickets} onChange={e => setForm(f => ({ ...f, tickets: e.target.value }))} required />
        </>
      );
    default:
      return null;
  }
}

function BookingFlow() {
  // PUBLIC_INTERFACE
  /**
   * BookingFlow – top-level component for booking forms
   */
  const [purpose, setPurpose] = useState("");
  const [form, setForm] = useState(getInitialForm(""));
  const [submitted, setSubmitted] = useState(false);
  const { addBooking } = useBooking();

  function handlePurposeChange(e) {
    setPurpose(e.target.value);
    setForm(getInitialForm(e.target.value));
    setSubmitted(false);
  }

  function handleInputChange(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!purpose || !validateRequired(purpose, form)) {
      setSubmitted(true);
      return;
    }
    addBooking({ ...form, purpose, ts: new Date().toISOString() });
    setPurpose("");
    setForm(getInitialForm(""));
    setSubmitted(false);
  }

  return (
    <section className="ubx-container ubx-page-section">
      <h2 className="title">Booking Flow</h2>
      <div className="description mb-2">
        Choose your booking purpose and fill in the form below. All booking data is handled securely in our system.
      </div>
      <div className="ubx-card" style={{ maxWidth: 480, margin: "0 auto" }}>
        {/* Purpose Dropdown */}
        <label htmlFor="purpose" className="font-bold" style={{ fontSize: "1.12em", display: "block", marginBottom: "4px" }}>
          Booking Purpose
        </label>
        <select
          id="purpose"
          className="ubx-input"
          value={purpose}
          onChange={handlePurposeChange}
          style={{ marginBottom: 24 }}
        >
          <option value="">Select purpose...</option>
          {PURPOSES.map(p => (
            <option key={p.value} value={p.value}>{p.emoji} {p.label}</option>
          ))}
        </select>

        {/* Contextual Form */}
        {purpose && (
          <form autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: 10 }}>
            <label className="font-bold" style={{ fontSize: "1.06em", marginBottom: 4, display: "block" }}>
              Your Details
            </label>
            <input className="ubx-input" type="text" placeholder="Full Name" value={form.name || ""} onChange={e => handleInputChange("name", e.target.value)} required />
            <input className="ubx-input" type="email" placeholder="Email" value={form.email || ""} onChange={e => handleInputChange("email", e.target.value)} required />
            <div style={{ marginBottom: 8 }} />
            <BookingFormFields purpose={purpose} form={form} setForm={setForm} />

            {submitted && !validateRequired(purpose, form) && (
              <div className="text-center mb-2" style={{ color: "var(--ubx-accent)", fontWeight: 500 }}>
                Please complete all required fields.
              </div>
            )}

            <button
              type="submit"
              className="ubx-btn ubx-btn-primary ubx-btn-lg"
              style={{ marginTop: 10, width: "100%" }}
            >
              Book Now
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default BookingFlow;
