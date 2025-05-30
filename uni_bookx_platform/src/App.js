import React, { useState, createContext, useContext } from 'react';
import './App.css';
import MainLayout from './components/MainLayout';
import SearchBar from "./components/SearchBar";
import DomainFilter from "./components/DomainFilter";
import SearchResults from "./components/SearchResults";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Create a BookingContext to share booking data between BookingFlow and AdminDashboard
const BookingContext = createContext();

// PUBLIC_INTERFACE
export function useBooking() {
  // Hook to access booking context state
  return useContext(BookingContext);
}

// PUBLIC_INTERFACE
function BookingProvider({ children }) {
  // Holds array of all bookings
  const [bookings, setBookings] = useState([]);
  function addBooking(newBooking) {
    setBookings((prev) => [...prev, newBooking]);
  }
  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

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

const MOCK_RESULTS = [
  // Demo event cards for mock search
  {
    id: 1,
    title: "Avengers: Secret Wars (Premiere)",
    location: "PVR Plaza, Mumbai",
    datetime: "Sat, 27 Apr · 7:30pm",
    domain: "🎬 Movies",
    cover: "🍿",
    description: "Catch the cinematic event of the year. Book exclusive premiere tickets, bundles & offers!",
    keywords: ["movie", "avengers", "cinema", "premiere"],
    domainKey: "movies"
  },
  {
    id: 2,
    title: "IPL Final - DY Patil Stadium",
    location: "Navi Mumbai",
    datetime: "Sun, 19 May · 4:00pm",
    domain: "🏟️ Sports",
    cover: "🏏",
    description: "Final match of the IPL season. Choose your seats, VIP packages, instant ticket transfer!",
    keywords: ["cricket", "IPL", "sports", "stadium", "match"],
    domainKey: "sports"
  },
  {
    id: 3,
    title: "Arijit Singh Live Concert",
    location: "Indira Gandhi Arena, Delhi",
    datetime: "Sat, 11 May · 7:00pm",
    domain: "🎵 Concerts",
    cover: "🎤",
    description: "Experience India's top voice live. Front row + travel package available!",
    keywords: ["arijit", "singh", "concert", "music", "delhi"],
    domainKey: "concerts"
  },
  {
    id: 4,
    title: "Goa Summer Getaway Offer",
    location: "Goa, India",
    datetime: "1 May - 10 May",
    domain: "✈️ Travel",
    cover: "🌴",
    description: "Flight + hotel deals, exclusive activity bookings, AR previews.",
    keywords: ["goa", "travel", "flight", "hotel"],
    domainKey: "travel"
  },
  {
    id: 5,
    title: "Figma Design Future Expo",
    location: "Bengaluru Expo Center",
    datetime: "Thu, 30 May · 12:00pm",
    domain: "📅 Expos",
    cover: "🎨",
    description: "Technology, startups, and global creators gather at India's biggest expo.",
    keywords: ["expo", "technology", "design"],
    domainKey: "expos"
  },
  {
    id: 6,
    title: "Resort and Pool Retreat",
    location: "Ranthambhore, Rajasthan",
    datetime: "Any date",
    domain: "🏨 Stay",
    cover: "🏊",
    description: "Luxury villas, on-demand concierge, personalized travel/experience bundles.",
    keywords: ["resort", "retreat", "hotel", "pool"],
    domainKey: "hotels"
  }
];

// PUBLIC_INTERFACE
const UniversalSearch = () => {
  // State for filters and query:
  const [query, setQuery] = useState("");
  const [domains, setDomains] = useState([]);
  const [intent, setIntent] = useState(null);

  // Simulate semantic search over MOCK_RESULTS (replace with API real AI call in prod)
  function performSearch(newQuery, activeDomains, predictedIntent) {
    if (!newQuery && (!activeDomains || activeDomains.length === 0)) return MOCK_RESULTS;
    return MOCK_RESULTS.filter((item) => {
      // Check if matches any filter domain
      if (activeDomains && activeDomains.length) {
        if (!activeDomains.includes(item.domainKey)) return false;
      }
      // Simple keyword search (real app would use full semantic/AI)
      if (newQuery) {
        const q = newQuery.toLowerCase();
        const hay = (
          [item.title, item.description, ...(item.keywords || [])].join(" ").toLowerCase()
        );
        if (!hay.includes(q)) {
          // try match on intent
          if (predictedIntent && typeof predictedIntent === "string" && !hay.includes(predictedIntent.toLowerCase())) {
            return false;
          }
        }
      }
      return true;
    });
  }

  // Internal only, for controlled SearchBar usage:
  const [displayedResults, setDisplayedResults] = useState(MOCK_RESULTS);

  function handleSearchFromBar(q) {
    setQuery(q);
    const filtered = performSearch(q, domains, intent);
    setDisplayedResults(filtered);
  }
  function handleIntent(predicted) {
    setIntent(predicted);
    // Optionally force domain based on intent: not done now
  }
  function handleDomains(dd) {
    setDomains(dd);
    const filtered = performSearch(query, dd, intent);
    setDisplayedResults(filtered);
  }

  return (
    <section className="ubx-container ubx-page-section">
      <h2 className="title">Universal Search</h2>
      <div className="description" style={{ marginBottom: 16 }}>
        Semantic and cross-domain search for tickets and events.
      </div>
      <SearchBar
        onSearch={handleSearchFromBar}
        onIntentChange={handleIntent}
      />
      <DomainFilter onChange={handleDomains} initialDomains={[]} />
      <SearchResults results={displayedResults} />
    </section>
  );
};


// Purpose selection
const PURPOSES = [
  { value: "sports", emoji: "🏟️", label: "Sports Event" },
  { value: "movies", emoji: "🎬", label: "Movies / Show" },
  { value: "travel", emoji: "✈️", label: "Travel Booking" },
  { value: "venues", emoji: "🏛️", label: "Event Venue" },
  { value: "resorts", emoji: "🏖️", label: "Resorts / Stay" },
  { value: "local_events", emoji: "📅", label: "Local Event" },
  { value: "concerts", emoji: "🎵", label: "Concert" },
];

function initialFormFor(purpose) {
  // Return initial form object for a given purpose
  switch (purpose) {
    case "sports":
      return { name: "", email: "", sport: "", event: "", seats: 1, date: "" };
    case "movies":
      return { name: "", email: "", movie: "", theatre: "", seats: 1, datetime: "" };
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
      return {};
  }
}

function validateForm(purpose, form) {
  // Checks required fields (simple)
  const req = {
    sports: ["name", "email", "sport", "event", "date", "seats"],
    movies: ["name", "email", "movie", "theatre", "datetime", "seats"],
    travel: ["name", "email", "from", "to", "date", "travelMode", "passengers"],
    venues: ["name", "email", "venue", "eventType", "date", "people"],
    resorts: ["name", "email", "resort", "checkin", "checkout", "rooms"],
    local_events: ["name", "email", "event", "location", "date", "tickets"],
    concerts: ["name", "email", "artist", "concert", "date", "tickets"],
  }[purpose];
  if (!req) return false;
  for (let k of req) {
    if (!form[k] || String(form[k]).trim() === "") return false;
  }
  return true;
}

// Booking form entries by type:
function BookingFormFields({ purpose, form, setForm }) {
  // Choosing visually most on-brand controls in atomic style.
  switch (purpose) {
    case "sports":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Event (e.g. IPL Final)" value={form.event} onChange={e => setForm(f => ({ ...f, event: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="Sport (e.g. Cricket, Football)" value={form.sport} onChange={e => setForm(f => ({ ...f, sport: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input className="ubx-input" type="number" min={1} placeholder="Seats" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: e.target.value }))} required />
        </>
      );
    case "movies":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Movie Name" value={form.movie} onChange={e => setForm(f => ({ ...f, movie: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="Theatre" value={form.theatre} onChange={e => setForm(f => ({ ...f, theatre: e.target.value }))} required />
          <input className="ubx-input" type="datetime-local" placeholder="Date/time" value={form.datetime} onChange={e => setForm(f => ({ ...f, datetime: e.target.value }))} required />
          <input className="ubx-input" type="number" min={1} placeholder="Seats" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: e.target.value }))} required />
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
            <option value="cab">Cab / Taxi</option>
          </select>
          <input className="ubx-input" type="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input className="ubx-input" type="number" min={1} placeholder="Passengers" value={form.passengers} onChange={e => setForm(f => ({ ...f, passengers: e.target.value }))} required />
        </>
      );
    case "venues":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Venue Name" value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="Event Type" value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input className="ubx-input" type="number" min={1} placeholder="No. of People" value={form.people} onChange={e => setForm(f => ({ ...f, people: e.target.value }))} required />
        </>
      );
    case "resorts":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Resort Name" value={form.resort} onChange={e => setForm(f => ({ ...f, resort: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Check-in" value={form.checkin} onChange={e => setForm(f => ({ ...f, checkin: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Check-out" value={form.checkout} onChange={e => setForm(f => ({ ...f, checkout: e.target.value }))} required />
          <input className="ubx-input" type="number" min={1} placeholder="Rooms" value={form.rooms} onChange={e => setForm(f => ({ ...f, rooms: e.target.value }))} required />
        </>
      );
    case "local_events":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Event Name" value={form.event} onChange={e => setForm(f => ({ ...f, event: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input className="ubx-input" type="number" min={1} placeholder="Tickets" value={form.tickets} onChange={e => setForm(f => ({ ...f, tickets: e.target.value }))} required />
        </>
      );
    case "concerts":
      return (
        <>
          <input className="ubx-input" type="text" placeholder="Artist Name" value={form.artist} onChange={e => setForm(f => ({ ...f, artist: e.target.value }))} required />
          <input className="ubx-input" type="text" placeholder="Concert/Event" value={form.concert} onChange={e => setForm(f => ({ ...f, concert: e.target.value }))} required />
          <input className="ubx-input" type="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input className="ubx-input" type="number" min={1} placeholder="Tickets" value={form.tickets} onChange={e => setForm(f => ({ ...f, tickets: e.target.value }))} required />
        </>
      );
    default:
      return null;
  }
}

function BookingFlow() {
  // Booking UI state
  const [purpose, setPurpose] = useState("");
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { addBooking } = useBooking();

  // Reset fields on purpose change
  function handlePurposeChange(e) {
    setPurpose(e.target.value);
    setForm(initialFormFor(e.target.value));
    setSubmitted(false);
  }

  function handleInputChange(key, val) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!purpose || !validateForm(purpose, form)) {
      setSubmitted(true); // Show simple error style
      return;
    }
    // Save booking to shared state
    addBooking({
      purpose,
      ...form,
      ts: new Date().toISOString(),
    });
    setSubmitted(false);
    setPurpose("");
    setForm({});
  }

  return (
    <section className="ubx-container ubx-page-section">
      <h2 className="title">Booking Flow</h2>
      <div className="description" style={{ marginBottom: 18 }}>
        Start your booking journey. Choose your booking purpose and fill out the details below!
      </div>
      <div className="ubx-card" style={{ maxWidth: 460, margin: "0 auto" }}>
        {/* Purpose dropdown */}
        <label htmlFor="booking-purpose" className="font-bold mb-1" style={{ fontSize: "1.08em", display: "block" }}>
          Booking Purpose
        </label>
        <select
          id="booking-purpose"
          value={purpose}
          onChange={handlePurposeChange}
          className="ubx-input"
          style={{ marginBottom: 22 }}
        >
          <option value="">Select purpose...</option>
          {PURPOSES.map(({ value, emoji, label }) => (
            <option key={value} value={value}>
              {emoji} {label}
            </option>
          ))}
        </select>
        {purpose && (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label className="font-bold" style={{ fontSize: "1.06em", marginBottom: 6, display: 'block' }}>
              Your Details
            </label>
            <input className="ubx-input" type="text" placeholder="Full Name" value={form.name || ""} onChange={e => handleInputChange("name", e.target.value)} required />
            <input className="ubx-input" type="email" placeholder="Email" value={form.email || ""} onChange={e => handleInputChange("email", e.target.value)} required />
            <div style={{ marginBottom: 12 }} />
            <BookingFormFields purpose={purpose} form={form} setForm={setForm} />
            {submitted && !validateForm(purpose, form) && (
              <div className="text-center mb-2" style={{ color: "var(--ubx-accent)", fontWeight: 500 }}>
                Please complete all fields to book.
              </div>
            )}
            <button type="submit" className="ubx-btn ubx-btn-primary ubx-btn-lg" style={{ marginTop: 10, width: "100%", fontSize: "1.13em", letterSpacing: "1px" }}>
              Book Now
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function AdminDashboard() {
  // Read all bookings
  const { bookings } = useBooking();
  return (
    <section className="ubx-container ubx-page-section">
      <h2 className="title">Admin Portal: Booking History</h2>
      <div className="description" style={{ marginBottom: 16 }}>
        All recent bookings made by users are listed below.
      </div>
      {bookings.length === 0 ? (
        <div className="ubx-card text-center">No bookings recorded yet.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            background: "var(--ubx-background-alt)",
            borderRadius: 8,
            borderCollapse: "collapse",
            fontSize: "1.01em",
            marginBottom: 24,
            boxShadow: "0 1px 8px rgba(0,0,0,0.03)"
          }}>
            <thead>
              <tr style={{ background: "var(--ubx-background)", color: "var(--ubx-secondary)" }}>
                <th>Purpose</th>
                <th>Name</th>
                <th>Email</th>
                <th>Details</th>
                <th>Booked At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid var(--ubx-border)" }}>
                  <td>
                    <span>{PURPOSES.find(p => p.value === b.purpose)?.emoji || "🔎"} {PURPOSES.find(p => p.value === b.purpose)?.label || b.purpose}</span>
                  </td>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>
                    {/* Render key details as kv summary, with minimal info */}
                    <div style={{ fontSize: "0.96em", color: "#333" }}>
                      {
                        (() => {
                          const skip = ["purpose", "name", "email", "ts"];
                          return Object.entries(b)
                            .filter(([k]) => !skip.includes(k))
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(", ");
                        })()
                      }
                    </div>
                  </td>
                  <td style={{ fontSize: "0.93em", color: "#888" }}>{new Date(b.ts).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

const Dashboard = () => {
  // Display only user's booking history table
  const { bookings } = useBooking();
  return (
    <section className="ubx-container ubx-page-section">
      <h2 className="title">Booking History</h2>
      <div className="description" style={{ marginBottom: 16 }}>
        All your bookings are listed below. Manage and review your recent activity.
      </div>
      {bookings.length === 0 ? (
        <div className="ubx-card text-center" style={{ color: "var(--ubx-text-muted)" }}>
          You have no bookings yet.
        </div>
      ) : (
        <div className="ubx-card" style={{ overflowX: "auto", padding: 0, marginBottom: 0 }}>
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
                    background: idx % 2 === 0 ? "#fafafa" : "#f3f3f3",
                    color: "#232323"
                  }}
                >
                  <td style={{ minWidth: 130, padding: 12, fontWeight: 600 }}>
                    <span>
                      {(PURPOSES.find(p => p.value === b.purpose)?.emoji || "🔎")}&nbsp;
                      {PURPOSES.find(p => p.value === b.purpose)?.label || b.purpose}
                    </span>
                  </td>
                  <td style={{ minWidth: 100, padding: 12 }}>{b.name}</td>
                  <td style={{ minWidth: 120, padding: 12 }}>{b.email}</td>
                  <td style={{ minWidth: 160, padding: 12, fontSize: "0.97em" }}>
                    {/* Render booking field summary */}
                    {(() => {
                      const skip = ["purpose", "name", "email", "ts"];
                      return Object.entries(b)
                        .filter(([k]) => !skip.includes(k))
                        .map(([k, v]) => (
                          <span key={k} style={{ marginRight: 10 }}>
                            <span style={{ color: "var(--ubx-secondary)", fontWeight: 600 }}>
                              {k.charAt(0).toUpperCase() + k.slice(1)}:
                            </span>{" "}
                            {String(v)}
                          </span>
                        ));
                    })()}
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
    </section>
  );
};

function App() {
  return (
    <BookingProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<UniversalSearch />} />
            <Route path="/booking" element={<BookingFlow />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Default fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </BookingProvider>
  );
}

export default App;
