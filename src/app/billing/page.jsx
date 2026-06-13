"use client";
import Sidebar from "../../components/Sidebar";

export default function Billing() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: 20 }}>
        <h2>💳 Billing</h2>

        <div className="card">
          <p>Plan: Free</p>
          <p>Upgrade to Pro for unlimited campaigns</p>
          <button>Upgrade</button>
        </div>
      </div>
    </div>
  );
}