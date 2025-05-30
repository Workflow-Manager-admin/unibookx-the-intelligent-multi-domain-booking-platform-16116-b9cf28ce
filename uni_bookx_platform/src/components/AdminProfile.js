import React from "react";

/**
 * PUBLIC_INTERFACE
 * AdminProfile: Displays the current admin's profile information
 * in a UniBookX-branded (black, orange, accent) styled card.
 *
 * - Show name, email, contact, and mock role details.
 * - Style using atomic UniBookX theme classes.
 * - Placeholder/mock data for admin profile (since no backend/auth).
 */
const ADMIN = {
  name: "Priya Mehta",
  email: "priya.mehta@unibookx.com",
  contact: "+91 98765 43210",
  username: "admin-ux",
  role: "Super Admin",
  joined: "2023-01-15",
};

function AdminProfile() {
  return (
    <section className="ubx-container ubx-page-section" style={{ maxWidth: 470 }}>
      <div className="ubx-card" style={{
        background: "var(--ubx-primary)",
        color: "var(--ubx-secondary)",
        border: "1.5px solid var(--ubx-secondary)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.12)"
      }}>
        <div className="ubx-flex ubx-align-center ubx-gap-md" style={{ marginBottom: 16 }}>
          <div
            style={{
              background: "var(--ubx-accent)",
              color: "var(--ubx-primary)",
              borderRadius: "50%",
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 700,
              boxShadow: "0 2px 8px rgba(255,102,0,0.13)",
            }}
            aria-label="Admin Avatar"
          >
            {ADMIN.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: "1.24em", fontWeight: 700, color: "#fff" }}>
              {ADMIN.name}
            </div>
            <div style={{ fontSize: "1.05em", color: "var(--ubx-accent)" }}>
              {ADMIN.role}
            </div>
          </div>
        </div>
        <hr style={{
          border: "none",
          borderTop: "1px solid var(--ubx-border)",
          margin: "16px 0"
        }} />
        <div style={{ fontSize: "1.04em" }}>
          <div className="ubx-flex ubx-align-center ubx-gap-md" style={{ marginBottom: 6 }}>
            <span style={{ color: "var(--ubx-accent)", fontWeight: 600 }}>Email:</span>
            <span style={{ color: "#fff" }}>{ADMIN.email}</span>
          </div>
          <div className="ubx-flex ubx-align-center ubx-gap-md" style={{ marginBottom: 6 }}>
            <span style={{ color: "var(--ubx-accent)", fontWeight: 600 }}>Contact:</span>
            <span style={{ color: "#fff" }}>{ADMIN.contact}</span>
          </div>
          <div className="ubx-flex ubx-align-center ubx-gap-md" style={{ marginBottom: 6 }}>
            <span style={{ color: "var(--ubx-accent)", fontWeight: 600 }}>Username:</span>
            <span style={{ color: "#fff" }}>{ADMIN.username}</span>
          </div>
          <div className="ubx-flex ubx-align-center ubx-gap-md" style={{ marginBottom: 6 }}>
            <span style={{ color: "var(--ubx-accent)", fontWeight: 600 }}>Joined:</span>
            <span style={{ color: "#fff" }}>{ADMIN.joined}</span>
          </div>
        </div>
      </div>
      <div
        className="description"
        style={{
          marginTop: 22,
          color: "var(--ubx-text-muted)",
          background: "var(--ubx-background-alt)",
          borderRadius: "var(--ubx-radius)",
          padding: "14px 20px"
        }}
      >
        You are viewing the administrator profile. This page provides a summary of your account and contact details for UniBookX admin operations. For advanced settings, visit the admin portal.
      </div>
    </section>
  );
}

export default AdminProfile;
