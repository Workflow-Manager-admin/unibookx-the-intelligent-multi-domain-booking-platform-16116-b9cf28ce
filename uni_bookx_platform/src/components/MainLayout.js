import React from 'react';
import Sidebar from './Sidebar';

// PUBLIC_INTERFACE
function MainLayout({ children }) {
  /**
   * MainLayout provides the top-level layout structure:
   * - Fixed navbar at top
   * - Responsive sidebar for navigation (shown on desktop, collapsible on mobile)
   * - Content area renders the current route
   * 
   * All layout is accessible, responsive, and styled using the UniBookX theme/atomic classes.
   */
  return (
    <div className="app ubx-flex ubx-flex-col" tabIndex="-1">
      <nav className="navbar" aria-label="Main">
        <div className="ubx-container ubx-flex ubx-align-center ubx-justify-between">
          <a href="/" className="logo" aria-label="UniBookX Home">
            <span className="logo-symbol" aria-hidden="true">★</span>
            <span style={{ marginLeft: 6, fontWeight: 700 }}>UniBookX</span>
          </a>
          <div className="ubx-flex ubx-gap-md">
            <a href="/search" className="ubx-btn ubx-btn-accent ubx-btn-sm" tabIndex={0}>Universal Search</a>
            <a href="/dashboard" className="ubx-btn ubx-btn-primary ubx-btn-sm" tabIndex={0}>
              Dashboard
            </a>
          </div>
        </div>
      </nav>

      <div className="ubx-flex ubx-flex-row" style={{ flex: 1, minHeight: '100vh', marginTop: 68 }}>
        {/* Sidebar: hidden on mobile, shown on desktop */}
        <aside className="hide-mobile" style={{ minWidth: 220, borderRight: '1px solid var(--ubx-border)', background: 'var(--ubx-background-alt)' }}>
          <Sidebar />
        </aside>
        {/* Main content */}
        <main className="ubx-flex ubx-flex-col" style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
