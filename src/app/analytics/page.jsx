"use client";
import Sidebar from "../../components/Sidebar";

export default function Analytics() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: 20 }}>
        <h2>📊 Analytics</h2>

        <div className="card">
          <p>Weekly Growth: +12%</p>
          <p>Engagement: High</p>
        </div>
      </div>
    </div>
  );
}