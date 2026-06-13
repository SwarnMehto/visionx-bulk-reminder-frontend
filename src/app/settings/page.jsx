"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { getUser, updateUser } from "../../lib/userStore";

export default function Settings() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  // ✅ SAFE LOAD (NO undefined CRASH)
  useEffect(() => {
    const user = getUser();

    setForm({
      name: user?.name || "",
      email: user?.email || "",
      company: user?.company || "",
      phone: user?.phone || "",
    });
  }, []);

  // 💾 SAVE HANDLER
  const handleSave = () => {
    updateUser(form);
    alert("Settings Saved Successfully 🚀");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.main}>
        <h2>⚙️ Settings</h2>

        {/* ================= PROFILE CARD ================= */}
        <div className="card">
          <h3>👤 Profile Settings</h3>

          <input
            placeholder="Full Name"
            value={form.name || ""}   // ✅ SAFE
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={form.email || ""}  // ✅ SAFE
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Company Name"
            value={form.company || ""} // ✅ SAFE
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
          />

          <input
            placeholder="Phone Number"
            value={form.phone || ""}   // ✅ SAFE
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <button onClick={handleSave} style={styles.btn}>
            💾 Save Settings
          </button>
        </div>

        {/* ================= SYSTEM SETTINGS ================= */}
        <div className="card" style={{ marginTop: 20 }}>
          <h3>⚙️ System Settings</h3>

          <p>🔔 Notifications: ON</p>
          <p>📊 Analytics: Enabled</p>
          <p>🔐 Security: 2FA (Coming Soon)</p>
          <p>🌐 API Access: Enabled</p>
        </div>

        {/* ================= BILLING ================= */}
        <div className="card" style={{ marginTop: 20 }}>
          <h3>💳 Billing</h3>

          <p>Plan: Free Trial</p>
          <p>Usage: 1,240 / 10,000 messages</p>

          <button style={styles.upgrade}>
            🚀 Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  main: {
    flex: 1,
    padding: 20,
    background: "#f4f6fb",
    minHeight: "100vh",
  },

  btn: {
    marginTop: 15,
    width: "100%",
    background: "#4f46e5",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  upgrade: {
    marginTop: 10,
    width: "100%",
    background: "#22c55e",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};