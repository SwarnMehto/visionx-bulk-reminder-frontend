"use client";
import Sidebar from "../../components/Sidebar";

export default function Upload() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: 20 }}>
        <h2>📤 Contacts Upload</h2>

        <div className="card">
          <input type="file" />
          <p>Upload CSV file</p>
        </div>
      </div>
    </div>
  );
}