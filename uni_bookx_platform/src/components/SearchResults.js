import React from "react";

// PUBLIC_INTERFACE
/**
 * SearchResults - Renders results in UniBookX card theme.
 * - Accepts an array of result objects ({id, title, location, datetime, domain, cover, description}).
 * - If no results, output a friendly/empty state card.
 */
function SearchResults({ results }) {
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

  return (
    <div
      className="ubx-flex ubx-flex-col"
      style={{ width: "100%", gap: 0, marginTop: 10 }}
    >
      {results.map((item) => (
        <div className="ubx-card" key={item.id} style={{ padding: 14, marginBottom: 18 }}>
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
