"use client";

import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    let reply = "";

    if (msg.toLowerCase().includes("campaign")) {
      reply = "Go to Campaigns tab → Create Campaign → Upload CSV → Send.";
    } else if (msg.toLowerCase().includes("message")) {
      reply = "Write message in dashboard and select WhatsApp/Email/SMS.";
    } else {
      reply =
        "Sorry, I don't know this. Contact support: 7428603336";
    }

    setChat([...chat, { q: msg, a: reply }]);
    setMsg("");
  };

  return (
    <div style={styles.wrapper}>
      {open && (
        <div style={styles.box}>
          <div style={{ height: 200, overflow: "auto" }}>
            {chat.map((c, i) => (
              <div key={i}>
                <b>You:</b> {c.q}
                <br />
                <b>Bot:</b> {c.a}
                <hr />
              </div>
            ))}
          </div>

          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Ask something..."
          />

          <button onClick={handleSend}>Send</button>
        </div>
      )}

      <button style={styles.fab} onClick={() => setOpen(!open)}>
        🤖 AI
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    bottom: 20,
    left: 20,
  },
  fab: {
    background: "#4f46e5",
    color: "white",
    borderRadius: "50%",
    width: 55,
    height: 55,
  },
  box: {
    width: 250,
    height: 300,
    background: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
};