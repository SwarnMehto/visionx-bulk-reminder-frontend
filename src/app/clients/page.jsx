"use client";

import Sidebar from "../../components/Sidebar";
import Link from "next/link";

export default function Clients() {
  const clients = [
    { id: 1, name: "Lal Institute", campaigns: 12, status: "Active" },
    { id: 2, name: "ABC Coaching", campaigns: 5, status: "Active" },
    { id: 3, name: "Delhi Academy", campaigns: 8, status: "Inactive" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.main}>
        <h2>👥 Clients (CRM)</h2>

        <div style={styles.table}>
          {clients.map((c) => (
            <Link key={c.id} href={`/clients/${c.id}`}>
              <div style={styles.row}>
                <div>
                  <b>{c.name}</b>
                  <p style={{ margin: 0, fontSize: 12 }}>
                    Campaigns: {c.campaigns}
                  </p>
                </div>

                <span style={styles.status}>{c.status}</span>
              </div>
            </Link>
          ))}
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

  table: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  row: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    border: "1px solid #eef2f7",
    cursor: "pointer",
  },

  status: {
    fontSize: "12px",
    padding: "5px 10px",
    borderRadius: "8px",
    background: "#dcfce7",
  },
};