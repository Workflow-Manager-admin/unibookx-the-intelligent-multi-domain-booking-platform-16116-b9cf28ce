import React from "react";
import { useBooking } from "../App";

/**
 * PUBLIC_INTERFACE
 * AdminDashboard: Real-time booking history table for the UniBookX admin portal.
 * - Auto-updates using booking context (shared with BookingFlow)
 * - Modern, accessible table UI styled in UniBookX black-orange admin theme
 * - Displays booking details, purpose, and instant updates on new bookings
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

// Small utility to prettify details for a booking row
function renderBookingDetails(booking) {
  const skip = ["purpose", "name", "email", "ts"];
  // Show other fields as "label: value"
  return Object.entries(booking)
    .filter(([k]) => !skip.includes(k))
    .map(([k, v]) =>
      <span key={k} style={{ marginRight: 12 }}>
        <span style={{ color: 'var(--ubx-secondary)', fontWeight: 600 }}>
          {k.charAt(0).toUpperCase() + k.slice(1)}:
        </span> {String(v)}
      </span>
    );
}

// PUBLIC_INTERFACE
function AdminDashboard() {
  // Subscribe to live booking history via context
  const { bookings } = useBooking();

  return (
    <section className="ubx-container ubx-page-section">
      <h2 className="title">Admin Portal: Booking History</h2>
      <div className="description" style={{ marginBottom: 16 }}>
        All bookings submitted by users will appear below, live.
      </div>
      {bookings.length === 0 ? (
        <div className="ubx-card text-center" style={{ background: "#111", color: "var(--ubx-secondary)" }}>
          <div style={{ fontSize: 38, marginBottom: 10 }}>📭</div>
          <div className="font-bold">No bookings have been recorded yet.</div>
          <div style={{ fontSize: "1em", marginTop: 6, color: "#888" }}>
            New bookings will be listed here in real time!
          </div>
        </div>
      ) : (
        <div className="ubx-card" style={{
          overflowX: "auto",
          background: "var(--ubx-background-alt)",
          padding: 0,
          marginBottom: 0,
        }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "1.01em",
              borderRadius: "var(--ubx-radius)",
              overflow: "hidden",
              background: "var(--ubx-background-alt)"
            }}
          >
            <thead>
              <tr
                style={{
                  background: "var(--ubx-primary)",
                  color: "var(--ubx-secondary)",
                  fontWeight: 700,
                  fontSize: "1.08em",
                }}
              >
                <th style={{ padding: 13, textAlign: "left" }}>Purpose</th>
                <th style={{ padding: 13, textAlign: "left" }}>Name</th>
                <th style={{ padding: 13, textAlign: "left" }}>Email</th>
                <th style={{ padding: 13, textAlign: "left" }}>Details</th>
                <th style={{ padding: 13, textAlign: "left" }}>Booked At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: "1px solid var(--ubx-border)",
                    background: idx % 2 === 0 ? "#181818" : "#232323",
                    color: "#fff"
                  }}
                >
                  <td style={{ minWidth: 130, padding: 12, fontWeight: 600 }}>
                    <span>
                      {(PURPOSES.find(p => p.value === b.purpose)?.emoji || "✏️")}&nbsp;
                      {PURPOSES.find(p => p.value === b.purpose)?.label || b.purpose}
                    </span>
                  </td>
                  <td style={{ minWidth: 100, padding: 12 }}>{b.name}</td>
                  <td style={{ minWidth: 120, padding: 12 }}>{b.email}</td>
                  <td style={{ minWidth: 160, padding: 12, fontSize: "0.97em" }}>
                    {renderBookingDetails(b)}
                  </td>
                  <td style={{
                    minWidth: 110,
                    padding: 12,
                    fontSize: "0.96em",
                    color: "var(--ubx-accent)"
                  }}>
                    {b.ts ? new Date(b.ts).toLocaleString() : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ color: "var(--ubx-secondary)", marginTop: 22, textAlign: "right", fontSize: "1.04em", fontWeight: 600 }}>
        🟠 Live &mdash; Bookings sync instantly from user booking activity
      </div>
    </section>
  );
}

export default AdminDashboard;
