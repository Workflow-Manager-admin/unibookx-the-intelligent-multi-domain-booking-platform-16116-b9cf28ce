import React, { useState } from 'react';
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