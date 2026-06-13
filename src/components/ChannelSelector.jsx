"use client";

export default function ChannelSelector({ channel, setChannel }) {
  const btn = (name) => ({
    padding: "8px 12px",
    borderRadius: "999px",
    marginRight: "10px",
    border: "none",
    cursor: "pointer",
    transition: "0.2s",
    background: channel === name ? "#6366f1" : "#e5e7eb",
    color: channel === name ? "white" : "black",
    transform: channel === name ? "scale(1.05)" : "scale(1)",
  });

  return (
    <div>
      <button style={btn("whatsapp")} onClick={() => setChannel("whatsapp")}>
        WhatsApp
      </button>

      <button style={btn("email")} onClick={() => setChannel("email")}>
        Email
      </button>

      <button style={btn("sms")} onClick={() => setChannel("sms")}>
        SMS
      </button>
    </div>
  );
}