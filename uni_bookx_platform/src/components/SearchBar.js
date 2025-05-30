import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * SearchBar - A semantic search bar component for UniBookX.
 * - Text input for semantic queries.
 * - Intent prediction (mock: e.g., "Movie", "Match", "Concert").
 * - Mock icon buttons for voice/image search (non-functional).
 * - Mobile-first, styled with UniBookX atomic classes/brand.
 */
function SearchBar({ onSearch, onIntentChange }) {
  const [value, setValue] = useState("");
  const [predictedIntent, setPredictedIntent] = useState(null);

  // Dummy intent model for demo (replace with AI backend later)
  function predictIntent(text) {
    if (!text) return null;
    const low = text.toLowerCase();
    if (low.includes("movie") || low.includes("cinema")) return "🎬 Film";
    if (low.includes("flight") || low.includes("airport")) return "✈️ Travel";
    if (low.includes("football") || low.includes("cricket") || low.includes("stadium")) return "🏟️ Sports";
    if (low.includes("concert") || low.includes("artist")) return "🎵 Concert";
    if (low.includes("hotel") || low.includes("resort")) return "🏨 Stay";
    if (low.includes("event") || low.includes("expo")) return "📅 Event";
    return "🤖 All domains";
  }

  function handleInput(e) {
    const val = e.target.value;
    setValue(val);
    const intent = predictIntent(val);
    setPredictedIntent(intent);
    onIntentChange && onIntentChange(intent);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch && onSearch(value);
  }

  return (
    <form
      className="ubx-flex ubx-align-center ubx-gap-sm"
      style={{
        background: "var(--ubx-background-alt)",
        border: "1.5px solid var(--ubx-border)",
        borderRadius: "var(--ubx-radius)",
        boxShadow: "0 1px 6px rgba(0,0,0,0.02)",
        padding: 8,
        width: "100%",
        maxWidth: 550,
        margin: "0 auto",
      }}
      onSubmit={handleSubmit}
    >
      <input
        className="ubx-input"
        type="search"
        placeholder="Search anything (movie, event, match, place, etc.)"
        aria-label="Semantic search"
        value={value}
        onChange={handleInput}
        style={{
          border: "none",
          marginBottom: 0,
          background: "transparent",
          minWidth: 0,
          flex: 1,
        }}
      />
      {/* Voice search mock icon */}
      <button
        type="button"
        title="Voice Search (demo)"
        className="ubx-btn ubx-btn-accent ubx-btn-sm"
        tabIndex={0}
        aria-label="Voice Search Unavailable"
        style={{ padding: "0.5em", fontSize: "1.25em", minWidth: 36 }}
        disabled
      >
        <span role="img" aria-label="microphone">🎤</span>
      </button>
      {/* Image search mock icon */}
      <button
        type="button"
        title="Image Search (demo)"
        className="ubx-btn ubx-btn-primary ubx-btn-sm"
        tabIndex={0}
        aria-label="Image Search Unavailable"
        style={{ padding: "0.5em", fontSize: "1.15em", minWidth: 36 }}
        disabled
      >
        <span role="img" aria-label="image search">🖼️</span>
      </button>
      {/* Search button */}
      <button
        type="submit"
        className="ubx-btn ubx-btn-secondary ubx-btn-sm"
        style={{
          fontWeight: 600,
          minWidth: 42,
          marginLeft: 4
        }}
        aria-label="Submit search"
      >
        <span role="img" aria-label="search">🔎</span>
      </button>
      {predictedIntent && (
        <span
          className="font-bold ubx-btn ubx-btn-accent ubx-btn-sm"
          style={{
            marginLeft: 8,
            pointerEvents: "none",
            fontSize: "0.97em",
            opacity: 0.88,
          }}
          aria-label={`Predicted intent: ${predictedIntent}`}
        >
          {predictedIntent}
        </span>
      )}
    </form>
  );
}

export default SearchBar;
