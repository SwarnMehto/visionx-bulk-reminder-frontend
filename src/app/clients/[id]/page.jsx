"use client";

import Sidebar from "../../../components/Sidebar";

export default function ClientDetail({ params }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.main}>
        <h2>🏢 Client Profile #{params.id}</h2>

        {/* PROFILE CARD */}
        <div style={styles.card}>
          <h3>Lal Institute</h3>
          <p>Status: Active</p>
          <p>Total Campaigns: 12</p>
          <p>Total Messages Sent: 15,000</p>
        </div>

        {/* TIMELINE */}
        <h3 style={{ marginTop: 20 }}>📊 Activity Timeline</h3>

        <div style={styles.timeline}>
          <p>✔ WhatsApp Campaign Sent - 1200 users</p>
          <p>✔ Email Campaign - 800 users</p>
          <p>✔ SMS Campaign - 500 users</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    flex: 1,
    padding: "25px",
    background: "#f4f6fb",
    minHeight: "100vh",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  timeline: {
    marginTop: "15px",
    background: "white",
    padding: "15px",
    borderRadius: "14px",
  },
};