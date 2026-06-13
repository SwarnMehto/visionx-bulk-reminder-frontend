"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import CsvUploader from "../../components/CsvUploader";
import MessageBox from "../../components/MessageBox";
import ChannelSelector from "../../components/ChannelSelector";
import PosterUpload from "../../components/PosterUpload";
import SendButton from "../../components/SendButton";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Dashboard() {
  const [channel, setChannel] = useState("whatsapp");
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const wrapperRef = useRef();

  // ✅ CLOSE DROPDOWNS ON OUTSIDE CLICK (SAAS UX FIX)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowProfile(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stats = [
    { label: "Messages Sent", value: "1,240", icon: "📨" },
    { label: "Success Rate", value: "89%", icon: "📊" },
    { label: "Contacts", value: "3,200", icon: "👥" },
    { label: "Campaigns", value: "12", icon: "⚡" },
  ];

  const showPoster =
    channel === "whatsapp" || channel === "email";

  return (
    <div ref={wrapperRef} style={styles.wrapper}>
      <Sidebar />

      <div style={styles.main}>

        {/* ================= TOPBAR ================= */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={styles.topbar}
        >
          {/* LEFT WELCOME */}
          <div>
            <h2 style={styles.welcome}>Welcome Swarn 👋</h2>
            <p style={styles.subText}>
              Manage your campaigns & messaging system
            </p>
          </div>

          {/* RIGHT ICONS */}
          <div style={styles.iconGroup}>
            
            {/* NOTIFICATION */}
            <div
              style={styles.iconBtn}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
            >
              🔔
            </div>

            {/* PROFILE */}
            <div
              style={styles.iconBtn}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
            >
              👤
            </div>
          </div>
        </motion.div>

        {/* ================= PROFILE DROPDOWN ================= */}
        <AnimatePresence>
  {showProfile && (
    <motion.div style={styles.dropdown}>

      {/* REAL EDITABLE PROFILE */}
      <p
        style={styles.item}
        onClick={() => {
          window.location.href = "/settings";
        }}
      >
        ✏️ Edit Your Profile
      </p>

      <p style={styles.item}>
        👤 Name: Swarn
      </p>

      <p style={styles.item}>
        📧 Email: swarn@example.com
      </p>

      <p
        style={styles.item}
        onClick={() =>
          window.open("https://wa.me/8700116436")
        }
      >
        💬 Help Desk (WhatsApp Support)
      </p>

      <p
        style={styles.item}
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        🚪 Logout
      </p>

    </motion.div>
  )}
</AnimatePresence>

        {/* ================= NOTIFICATIONS ================= */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={styles.dropdown}
            >
              <div style={styles.dropdownHeader}>
                🔔 Notifications
              </div>

              <p style={styles.item}>
                🚀 Campaign Sent Successfully
              </p>
              <p style={styles.item}>
                📊 Delivery Rate: 89%
              </p>
              <p style={styles.item}>
                ⚡ New Contacts Uploaded
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= STATS ================= */}
        <div style={styles.statsGrid}>
          {stats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              style={styles.card}
            >
              <div style={{ fontSize: 22 }}>{item.icon}</div>
              <div>
                <h3 style={styles.value}>{item.value}</h3>
                <p style={styles.label}>{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= GRID ================= */}
        <div style={styles.grid}>
          
          {/* LEFT */}
          <div style={styles.panel}>
            <h3>Upload Contacts</h3>
            <CsvUploader />

            <h3 style={{ marginTop: 20 }}>Message</h3>
            <MessageBox />
          </div>

          {/* RIGHT */}
          <div style={styles.panel}>
            <h3>Channel Selection</h3>

            <ChannelSelector
              channel={channel}
              setChannel={setChannel}
            />

            <div style={styles.channelBox}>
              Selected: <b>{channel.toUpperCase()}</b>
            </div>

            {/* POSTER RULE */}
            <AnimatePresence mode="wait">
              {showPoster ? (
                <motion.div style={styles.posterBox}>
                  <h4>Poster Upload</h4>
                  <PosterUpload />
                  <p style={{ fontSize: 12 }}>
                    WhatsApp & Email only
                  </p>
                </motion.div>
              ) : (
                <motion.div style={styles.warning}>
                  ⚠️ Poster disabled for SMS
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ marginTop: 20 }}>
              <SendButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(180deg,#f5f7fb,#eef2f7)",
  },

  main: { flex: 1, padding: 22 },

  topbar: {
    height: 65,
    background: "skyblue",
    borderRadius: 14,
    padding: "10px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },

  welcome: { margin: 0, fontSize: 22, fontWeight: 800 },
  subText: { margin: 0, fontSize: 13, color: "#6b7280" },

  iconGroup: { display: "flex", gap: 10 },

  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    background: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  dropdown: {
    position: "absolute",
    right: 25,
    top: 80,
    width: 220,
    background: "white",
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    zIndex: 999,
  },

  dropdownHeader: {
    padding: 10,
    fontWeight: "bold",
    borderBottom: "1px solid #eee",
    background: "#f9fafb",
  },

  item: {
    padding: 10,
    cursor: "pointer",
    display: "block",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 14,
    marginBottom: 18,
  },

  card: {
    background: "white",
    padding: 14,
    borderRadius: 14,
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  value: { margin: 0, fontSize: 22, fontWeight: 700 },
  label: { margin: 0, fontSize: 12, color: "#6b7280" },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 18,
  },

  panel: {
    background: "white",
    padding: 30,
    borderRadius: 40,
  },

  channelBox: {
    marginTop: 10,
    fontSize: 12,
    color: "#374151",
  },

  posterBox: {
    marginTop: 15,
    padding: 20,
    background: "#ecfeff",
    borderRadius: 12,
  },

  warning: {
    marginTop: 15,
    padding: 20,
    background: "#fff7ed",
    color: "#9a3412",
    borderRadius: 10,
    fontSize: 12,
  },
}; 