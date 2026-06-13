"use client";
import Sidebar from "../../components/Sidebar";

export default function Reports() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: 20 }}>
        <h2>📈 Reports</h2>

        <div className="card">
          <p>Campaign Success Rate: 89%</p>
          <p>Total Messages: 12,000</p>
          <p>Delivery Rate: 92%</p>
        </div>
      </div>
    </div>
  );
}