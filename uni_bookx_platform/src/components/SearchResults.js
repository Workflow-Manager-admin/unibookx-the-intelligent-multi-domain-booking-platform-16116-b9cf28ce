import React from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * SearchResults - Renders results in UniBookX card theme.
 * - Accepts an array of result objects ({id, title, location, datetime, domain, cover, description}).
 * - If no results, output a friendly/empty state card.
 * - Clicking a result navigates to the booking flow with prefilled data.
 */
function SearchResults({ results }) {
  const navigate = useNavigate();

  function mapResultToBookingPrefill(item) {
    // Map a result item to {purpose, formPrefill} for the booking flow.
    // Adjust rules as needed for different event types.
    // Domain key mapping to booking flow purposes
    const domainToPurpose = {
      movies: "movies",
      sports: "sports",
      concerts: "concerts",
      travel: "travel",
      expos: "local_events",
      hotels: "resorts",
    };

    const purpose = domainToPurpose[item.domainKey] || "";
    const prefill = { name: "", email: "" };

    // Populate based on the purpose type:
    if (purpose === "sports") {
      prefill.sport = item.keywords?.find(k =>
        /(cricket|football|tennis|badminton|hockey|sport)/i.test(k)
      ) || "";
      prefill.event = item.title || "";
      prefill.seats = 1;
      prefill.date = "";
    }
    if (purpose === "movies") {
      prefill.movie = item.title ? item.title.replace(/\s*\(.*\)/, "") : "";
      prefill.theatre = item.location || "";
      prefill.seats = 1;
      prefill.datetime = "";
    }
    if (purpose === "travel") {
      prefill.from = ""; // can't infer
      prefill.to = item.location || "";
      prefill.date = "";
      prefill.travelMode = "";
      prefill.passengers = 1;
    }
    if (purpose === "concerts") {
      prefill.artist = item.title?.split(" ")[0] || "";
      prefill.concert = item.title || "";
      prefill.date = "";
      prefill.tickets = 1;
    }
    if (purpose === "resorts") {
      prefill.resort = item.title || "";
      prefill.checkin = "";
      prefill.checkout = "";
      prefill.rooms = 1;
    }
    if (purpose === "local_events") {
      prefill.event = item.title || "";
      prefill.location = item.location || "";
      prefill.date = "";
      prefill.tickets = 1;
    }

    return { purpose, prefill };
  }

  if (!results || results.length === 0) {
    return (
      <div className="ubx-card text-center">
        <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
        <div className="font-bold" style={{ marginBottom: 3 }}>No matching events found</div>
        <div className="text-muted" style={{ fontSize: "0.98em" }}>
          Try different keywords, filters, or explore domains above!
        </div>
      </div>
    );
  }

  // Handler for clicking a card: go to booking page with state to prefill
  function handleResultClick(item) {
    const { purpose, prefill } = mapResultToBookingPrefill(item);
    navigate("/booking", { state: { purpose, prefill } });
  }

  return (
    <div
      className="ubx-flex ubx-flex-col"
      style={{ width: "100%", gap: 0, marginTop: 10 }}
    >
      {results.map((item) => (
        <div
          className="ubx-card"
          key={item.id}
          tabIndex={0}
          role="button"
          style={{
            padding: 14,
            marginBottom: 18,
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            transition: "box-shadow 0.11s, border 0.11s",
          }}
          onClick={() => handleResultClick(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleResultClick(item);
          }}
          aria-label={`Select ${item.title} for booking`}
        >
          <div className="ubx-flex ubx-align-center ubx-gap-md" style={{ marginBottom: 9 }}>
            {/* Mock cover icon */}
            <div
              style={{
                fontSize: 36,
                width: 48,
                height: 48,
                background: "rgba(255,102,0,0.12)",
                color: "var(--ubx-secondary)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
              aria-hidden="true"
            >
              {item.cover || "🎫"}
            </div>
            <div style={{ flex: 1 }}>
              <div className="font-bold" style={{ fontSize: "1.15em" }}>
                {item.title}
              </div>
              <div className="text-muted" style={{ fontSize: "0.98em" }}>
                {item.location} · {item.datetime}
              </div>
            </div>
            <span
              className="ubx-btn ubx-btn-accent ubx-btn-sm"
              style={{
                fontSize: "0.94em",
                padding: "0.2em 0.8em",
                pointerEvents: "none"
              }}
              aria-label={item.domain}
            >
              {item.domain}
            </span>
          </div>
          <div className="description" style={{ marginBottom: 2 }}>
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
