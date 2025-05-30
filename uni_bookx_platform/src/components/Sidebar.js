import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Sidebar contains accessible navigation for primary sections:
 * Home, Search, Booking, Dashboard, Admin.
 * Integrates new theme and atomic classes for visual consistency.
 */
function Sidebar() {
  // NavLink for highlighting active section
  const navLinks = [
    { to: '/', label: '🏠 Home', exact: true },
    { to: '/search', label: '🔎 Universal Search' },
    { to: '/booking', label: '🎟️ Booking Flow' },
    { to: '/dashboard', label: '👤 Dashboard' },
    { to: '/admin', label: '🛠️ Admin Portal' },
  ];

  return (
    <nav aria-label="Sidebar navigation" style={{ padding: '2rem 1rem 2rem 1.5rem' }}>
      <div className="ubx-flex ubx-flex-col ubx-gap-md" role="menu">
        {navLinks.map((lnk) => (
          <NavLink
            key={lnk.to}
            to={lnk.to}
            end={!!lnk.exact}
            className={({ isActive }) =>
              [
                'ubx-btn',
                'ubx-btn-sm',
                isActive ? 'ubx-btn-accent font-bold' : 'ubx-btn-primary',
                'rounded',
              ].join(' ')
            }
            style={{ width: '100%', marginBottom: 4 }}
            tabIndex={0}
            role="menuitem"
            aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
          >
            {lnk.label}
          </NavLink>
        ))}
      </div>
      <div style={{ marginTop: '2rem', color: 'var(--ubx-text-muted)', fontSize: '0.95em' }}>
        <div>
          <strong>Multi-Domain</strong> AI Booking
        </div>
        <div style={{ fontSize: '0.9em' }}>
          Movies · Sports · Travel · Concerts · Events
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
