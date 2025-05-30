import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * DomainFilter - Filter chips for event domains (movies, sports, travel...).
 * - Users can multi-select or toggle domains to narrow search scope.
 * - Styled with UniBookX chip/buttons and atomic classes.
 */
const DOMAIN_LIST = [
  { key: "movies", label: "🎬 Movies" },
  { key: "sports", label: "🏟️ Sports" },
  { key: "travel", label: "✈️ Travel" },
  { key: "concerts", label: "🎵 Concerts" },
  { key: "hotels", label: "🏨 Stay" },
  { key: "expos", label: "📅 Expos" },
];

function DomainFilter({ onChange, initialDomains }) {
  const [selected, setSelected] = useState(initialDomains || []);

  function toggle(key) {
    let next;
    if (selected.includes(key)) {
      next = selected.filter((k) => k !== key);
    } else {
      next = [...selected, key];
    }
    setSelected(next);
    onChange && onChange(next);
  }

  return (
    <div
      className="ubx-flex ubx-gap-sm ubx-flex-wrap"
      aria-label="Domain Filters"
      style={{ marginTop: 16, marginBottom: 12, flexWrap: 'wrap' }}
    >
      {DOMAIN_LIST.map(({ key, label }) => (
        <button
          key={key}
          className={[
            "ubx-btn ubx-btn-sm rounded",
            selected.includes(key) ? "ubx-btn-accent font-bold" : "ubx-btn-primary"
          ].join(" ")}
          style={{
            padding: "0.35em 1.1em",
            fontSize: "1em",
            marginBottom: 3,
          }}
          onClick={() => toggle(key)}
          aria-pressed={selected.includes(key)}
          tabIndex={0}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default DomainFilter;
